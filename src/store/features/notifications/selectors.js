const EMPTY_ARRAY = [];

export const selectNotificationsState = (state) => state.notifications;
export const selectNotifications = (state) => state.notifications.items;
export const selectUnreadNotificationsCount = (state) =>
  state.notifications.unreadCount;
export const selectNotificationsPagination = (state) =>
  state.notifications.pagination;
export const selectActiveNotificationFilter = (state) =>
  state.notifications.activeFilter;
export const selectReadingNotificationIds = (state) =>
  state.notifications.loading.markReadById;

export const selectNotificationsByFilter = (filter) => (state) =>
  state.notifications.itemsByFilter[filter] || EMPTY_ARRAY;
