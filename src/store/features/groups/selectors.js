export const selectGroupsState = (state) => state.groups;
export const selectGroups = (state) => state.groups.items;
export const selectActiveGroupFilter = (state) => state.groups.activeFilter;
export const selectSelectedGroup = (state) => state.groups.selectedGroup;

export const selectGroupsByFilter = (filter) => (state) =>
  state.groups.itemsByFilter[filter] || [];

export const selectGroupMembers = (groupId) => (state) =>
  state.groups.membersByGroupId[groupId] || [];

export const selectGroupBalances = (groupId) => (state) =>
  state.groups.balancesByGroupId[groupId] || [];
