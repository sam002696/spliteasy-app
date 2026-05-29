const EMPTY_ARRAY = [];

export const selectBalancesState = (state) => state.balances;
export const selectBalances = (state) => state.balances.items;
export const selectBalanceCounts = (state) => state.balances.counts;
export const selectActiveBalanceFilter = (state) => state.balances.activeFilter;

export const selectBalancesByFilter = (filter) => (state) =>
  state.balances.itemsByFilter[filter] || EMPTY_ARRAY;
