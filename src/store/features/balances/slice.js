import { createSlice } from "@reduxjs/toolkit";
import { readData } from "../../utils/readData";
import initialState from "./initialState";
import { balanceFilters, fetchBalances } from "./thunks";

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
      });
  },
});

export const { clearBalancesError, setActiveBalanceFilter } = balancesSlice.actions;

export default balancesSlice.reducer;
