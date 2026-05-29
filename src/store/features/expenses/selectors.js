const EMPTY_ARRAY = [];

export const selectExpenses = (state) => state.expenses;

export const selectExpensesByGroup = (groupId) => (state) =>
  state.expenses.byGroupId[groupId] || EMPTY_ARRAY;

export const selectSelectedExpense = (state) => state.expenses.selectedExpense;
