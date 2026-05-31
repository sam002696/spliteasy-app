const EMPTY_ARRAY = [];

export const selectHomeState = (state) => state.home;
export const selectHomeSummary = (state) => state.home.summary;
export const selectHomeActiveGroupsCount = (state) =>
  state.home.activeGroupsCount;
export const selectHomeActiveGroups = (state) =>
  state.home.activeGroups || EMPTY_ARRAY;
export const selectHomeRecentActivities = (state) =>
  state.home.recentActivities || EMPTY_ARRAY;
