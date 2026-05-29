import { createSlice } from "@reduxjs/toolkit";
import { readData } from "../../utils/readData";
import initialState from "./initialState";
import { balanceFilters, fetchBalances, settleBalance } from "./thunks";

function removeBalanceById(balances, balanceId) {
  return balances.filter((balance) => String(balance.id) !== String(balanceId));
}

const balancesSlice = createSlice({
  name: "balances",
  initialState,
  reducers: {
    clearBalancesError(state) {
      state.error = null;
    },
    setActiveBalanceFilter(state, action) {
      const filter = action.payload || balanceFilters.open;
      state.activeFilter = filter;
      state.items = state.itemsByFilter[filter] || [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalances.pending, (state, action) => {
        const filter = action.meta.arg || balanceFilters.open;

        state.loading.list = true;
        state.activeFilter = filter;
        state.items = state.itemsByFilter[filter] || [];
        state.error = null;
      })
      .addCase(fetchBalances.fulfilled, (state, action) => {
        const responseData = readData(action.payload.response, {});
        const filter =
          responseData.filter || action.payload.filter || balanceFilters.open;
        const balances = responseData.balances || [];

        state.loading.list = false;
        state.activeFilter = filter;
        state.items = balances;
        state.itemsByFilter[filter] = balances;
        state.counts = {
          ...state.counts,
          ...(responseData.counts || {}),
        };
        state.message = action.payload.response.message;
      })
      .addCase(fetchBalances.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload;
      })
      .addCase(settleBalance.pending, (state, action) => {
        const balanceId = action.meta.arg?.balanceId;

        if (balanceId) {
          state.loading.settleById[balanceId] = true;
        }

        state.error = null;
      })
      .addCase(settleBalance.fulfilled, (state, action) => {
        const { balanceId, response } = action.payload;

        if (balanceId) {
          delete state.loading.settleById[balanceId];
          state.items = removeBalanceById(state.items, balanceId);
          state.itemsByFilter.open = removeBalanceById(
            state.itemsByFilter.open,
            balanceId,
          );
          state.itemsByFilter.you_owe = removeBalanceById(
            state.itemsByFilter.you_owe,
            balanceId,
          );
        }

        state.message = response.message;
      })
      .addCase(settleBalance.rejected, (state, action) => {
        const balanceId = action.meta.arg?.balanceId;

        if (balanceId) {
          delete state.loading.settleById[balanceId];
        }

        state.error = action.payload;
      });
  },
});

export const { clearBalancesError, setActiveBalanceFilter } =
  balancesSlice.actions;

export default balancesSlice.reducer;
