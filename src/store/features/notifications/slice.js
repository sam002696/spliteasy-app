import { createSlice } from "@reduxjs/toolkit";
import { readData } from "../../utils/readData";
import initialState from "./initialState";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  notificationFilters,
} from "./thunks";

function mergeNotificationReadState(notifications, notificationId) {
  return notifications.map((notification) =>
    String(notification.id) === String(notificationId)
      ? {
          ...notification,
          is_read: true,
          read_at: notification.read_at || new Date().toISOString(),
        }
      : notification,
  );
}

function removeNotificationById(notifications, notificationId) {
  return notifications.filter(
    (notification) => String(notification.id) !== String(notificationId),
  );
}

function mergeNotifications(currentNotifications, nextNotifications) {
  const seenIds = new Set(
    currentNotifications.map((notification) => String(notification.id)),
  );

  return [
    ...currentNotifications,
    ...nextNotifications.filter((notification) => {
      const notificationId = String(notification.id);

      if (seenIds.has(notificationId)) {
        return false;
      }

      seenIds.add(notificationId);
      return true;
    }),
  ];
}

function hasNotification(notifications, notificationId) {
  return notifications.some(
    (notification) => String(notification.id) === String(notificationId),
  );
}

function prependNotification(notifications, notification) {
  if (!notification?.id) {
    return notifications;
  }

  if (hasNotification(notifications, notification.id)) {
    return notifications.map((item) =>
      String(item.id) === String(notification.id)
        ? { ...item, ...notification }
        : item,
    );
  }

  return [notification, ...notifications];
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotificationsError(state) {
      state.error = null;
    },
    setActiveNotificationFilter(state, action) {
      const filter = action.payload || notificationFilters.all;
      state.activeFilter = filter;
      state.items = state.itemsByFilter[filter] || [];
    },
    receiveNotification(state, action) {
      const notification = action.payload;

      if (!notification?.id) {
        return;
      }

      const wasKnown = hasNotification(
        state.itemsByFilter.all,
        notification.id,
      );
      const isUnread = !notification.is_read;

      state.itemsByFilter.all = prependNotification(
        state.itemsByFilter.all,
        notification,
      );

      if (isUnread) {
        state.itemsByFilter.unread = prependNotification(
          state.itemsByFilter.unread,
          notification,
        );
      } else {
        state.itemsByFilter.read = prependNotification(
          state.itemsByFilter.read,
          notification,
        );
      }

      state.items = state.itemsByFilter[state.activeFilter] || [];

      if (!wasKnown && isUnread) {
        state.unreadCount += 1;
      }

      if (!wasKnown) {
        state.pagination.total += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state, action) => {
        const filter = action.meta.arg?.filter || notificationFilters.all;
        const page = action.meta.arg?.page || 1;

        state.loading.list = true;
        state.activeFilter = filter;
        state.items =
          page === 1 ? state.itemsByFilter[filter] || [] : state.items;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        const response = action.payload.response;
        const data = readData(response, {});
        const meta = response.meta || data.meta || {};
        const filter = action.payload.filter || notificationFilters.all;
        const notifications = Array.isArray(data)
          ? data
          : data.notifications || data.items || data.data || [];

        state.loading.list = false;
        state.activeFilter = filter;
        state.items =
          action.payload.page > 1
            ? mergeNotifications(state.items, notifications)
            : notifications;
        state.itemsByFilter[filter] = state.items;
        state.unreadCount =
          meta.unread_count ?? data.unread_count ?? state.unreadCount;
        state.pagination = {
          ...state.pagination,
          ...(meta.pagination || data.pagination || {}),
        };
        state.message = response.message;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload;
      })
      .addCase(markNotificationRead.pending, (state, action) => {
        state.loading.markReadById[action.meta.arg] = true;
        state.error = null;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const { notificationId, response } = action.payload;

        delete state.loading.markReadById[notificationId];
        state.items =
          state.activeFilter === notificationFilters.unread
            ? removeNotificationById(state.items, notificationId)
            : mergeNotificationReadState(state.items, notificationId);
        state.itemsByFilter.all = mergeNotificationReadState(
          state.itemsByFilter.all,
          notificationId,
        );
        state.itemsByFilter.read = mergeNotificationReadState(
          state.itemsByFilter.read,
          notificationId,
        );
        state.itemsByFilter.unread = removeNotificationById(
          state.itemsByFilter.unread,
          notificationId,
        );
        state.unreadCount = Math.max(state.unreadCount - 1, 0);
        state.message = response.message;
      })
      .addCase(markNotificationRead.rejected, (state, action) => {
        delete state.loading.markReadById[action.meta.arg];
        state.error = action.payload;
      })
      .addCase(markAllNotificationsRead.pending, (state) => {
        state.loading.markAllRead = true;
        state.error = null;
      })
      .addCase(markAllNotificationsRead.fulfilled, (state, action) => {
        state.loading.markAllRead = false;
        state.items =
          state.activeFilter === notificationFilters.unread
            ? []
            : state.items.map((notification) => ({
                ...notification,
                is_read: true,
                read_at: notification.read_at || new Date().toISOString(),
              }));
        state.itemsByFilter.all = state.itemsByFilter.all.map((notification) => ({
          ...notification,
          is_read: true,
          read_at: notification.read_at || new Date().toISOString(),
        }));
        state.itemsByFilter.read = state.itemsByFilter.all;
        state.itemsByFilter.unread = [];
        state.unreadCount = 0;
        state.message = action.payload.message;
      })
      .addCase(markAllNotificationsRead.rejected, (state, action) => {
        state.loading.markAllRead = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearNotificationsError,
  receiveNotification,
  setActiveNotificationFilter,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
