import { createSlice } from "@reduxjs/toolkit";
import { readData } from "../../utils/readData";
import initialState from "./initialState";
import {
  createExpense,
  deleteExpense,
  fetchExpense,
  fetchGroupExpenses,
} from "./thunks";

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    clearExpensesError(state) {
      state.error = null;
    },
    setSelectedExpense(state, action) {
      state.selectedExpense = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupExpenses.pending, (state) => {
        state.loading.list = true;
        state.error = null;
      })
      .addCase(fetchGroupExpenses.fulfilled, (state, action) => {
        state.loading.list = false;
        state.byGroupId[action.payload.groupId] = readData(
          action.payload.response,
          []
        );
        state.message = action.payload.response.message;
      })
      .addCase(fetchGroupExpenses.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload;
      })
      .addCase(createExpense.pending, (state) => {
        state.loading.create = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading.create = false;
        const expense = readData(action.payload.response);

        if (expense) {
          const groupExpenses = state.byGroupId[action.payload.groupId] || [];
          state.byGroupId[action.payload.groupId] = [expense, ...groupExpenses];
          state.selectedExpense = expense;
        }

        state.message = action.payload.response.message;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })
      .addCase(fetchExpense.pending, (state) => {
        state.loading.detail = true;
        state.error = null;
      })
      .addCase(fetchExpense.fulfilled, (state, action) => {
        state.loading.detail = false;
        state.selectedExpense = readData(action.payload);
        state.message = action.payload.message;
      })
      .addCase(fetchExpense.rejected, (state, action) => {
        state.loading.detail = false;
        state.error = action.payload;
      })
      .addCase(deleteExpense.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading.delete = false;
        const { groupId, expenseId } = action.payload;

        if (groupId && state.byGroupId[groupId]) {
          state.byGroupId[groupId] = state.byGroupId[groupId].filter(
            (expense) => expense.id !== expenseId
          );
        }

        if (state.selectedExpense?.id === expenseId) {
          state.selectedExpense = null;
        }

        state.message = action.payload.response.message;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      });
  },
});

export const { clearExpensesError, setSelectedExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
