export const selectExpenses = (state) => state.expenses;

export const selectExpensesByGroup = (groupId) => (state) =>
  state.expenses.byGroupId[groupId] || [];

export const selectSelectedExpense = (state) => state.expenses.selectedExpense;
