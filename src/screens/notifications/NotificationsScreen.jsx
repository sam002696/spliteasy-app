import React, { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  selectActiveNotificationFilter,
  selectNotifications,
  selectNotificationsState,
  selectReadingNotificationIds,
  selectUnreadNotificationsCount,
  setActiveNotificationFilter,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import {
  NotificationFilterChips,
  NotificationsHeader,
  NotificationsList,
} from "./components";
import { notificationFilterOptions } from "./data/notificationFilters";
import { mapApiNotificationToListItem } from "./utils";

function NotificationsIntro({
  activeFilter,
  markAllDisabled,
  onBack,
  onFilterChange,
  onMarkAllRead,
  unreadCount,
}) {
  return (
    <>
      <NotificationsHeader
        markAllDisabled={markAllDisabled}
        onBack={onBack}
        onMarkAllRead={onMarkAllRead}
        unreadCount={unreadCount}
      />
      <NotificationFilterChips
        filters={notificationFilterOptions}
        onChange={onFilterChange}
        value={activeFilter}
      />
    </>
  );
}

export function NotificationsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const activeFilter = useAppSelector(selectActiveNotificationFilter);
  const unreadCount = useAppSelector(selectUnreadNotificationsCount);
  const readingIds = useAppSelector(selectReadingNotificationIds);
  const { loading } = useAppSelector(selectNotificationsState);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const mappedNotifications = useMemo(
    () => notifications.map(mapApiNotificationToListItem),
    [notifications],
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchNotifications({ filter: activeFilter }));
    }, [activeFilter, dispatch]),
  );

  const refreshNotifications = useCallback(async () => {
    setIsRefreshing(true);

    try {
      await dispatch(fetchNotifications({ filter: activeFilter }));
    } finally {
      setIsRefreshing(false);
    }
  }, [activeFilter, dispatch]);

  const changeFilter = useCallback(
    (filter) => {
      dispatch(setActiveNotificationFilter(filter));
    },
    [dispatch],
  );

  const markRead = useCallback(
    async (notificationId) => {
      await dispatch(markNotificationRead(notificationId));
    },
    [dispatch],
  );

  const markAllRead = useCallback(async () => {
    const result = await dispatch(markAllNotificationsRead());

    if (markAllNotificationsRead.fulfilled.match(result)) {
      dispatch(fetchNotifications({ filter: activeFilter }));
    }
  }, [activeFilter, dispatch]);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: theme.semantic.background,
        flex: 1,
      }}
    >
      <NotificationsList
        header={
          <NotificationsIntro
            activeFilter={activeFilter}
            markAllDisabled={loading.markAllRead}
            onBack={() => router.back()}
            onFilterChange={changeFilter}
            onMarkAllRead={markAllRead}
            unreadCount={unreadCount}
          />
        }
        isLoading={loading.list && mappedNotifications.length === 0}
        notifications={mappedNotifications}
        onMarkRead={markRead}
        onRefresh={refreshNotifications}
        readingIds={readingIds}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
}
