const EMPTY_ARRAY = [];

export const selectGroupsState = (state) => state.groups;
export const selectGroups = (state) => state.groups.items;
export const selectActiveGroupFilter = (state) => state.groups.activeFilter;
export const selectSelectedGroup = (state) => state.groups.selectedGroup;

export const selectGroupsByFilter = (filter) => (state) =>
  state.groups.itemsByFilter[filter] || EMPTY_ARRAY;

export const selectGroupMembers = (groupId) => (state) =>
  state.groups.membersByGroupId[groupId] || EMPTY_ARRAY;

export const selectGroupBalances = (groupId) => (state) =>
  state.groups.balancesByGroupId[groupId] || null;
