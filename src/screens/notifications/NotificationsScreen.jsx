import React, { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  selectActiveNotificationFilter,
  selectNotifications,
  selectNotificationsPagination,
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
  const pagination = useAppSelector(selectNotificationsPagination);
  const unreadCount = useAppSelector(selectUnreadNotificationsCount);
  const readingIds = useAppSelector(selectReadingNotificationIds);
  const { loading } = useAppSelector(selectNotificationsState);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const mappedNotifications = useMemo(
    () => notifications.map(mapApiNotificationToListItem),
    [notifications],
  );
  const currentPage = Number(pagination.current_page || 1);
  const lastPage = Number(pagination.last_page || 1);
  const hasNextPage = currentPage < lastPage;
  const isLoadingMore =
    loading.list && mappedNotifications.length > 0 && !isRefreshing;

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

  const loadMoreNotifications = useCallback(() => {
    if (!hasNextPage || loading.list || isRefreshing) {
      return;
    }

    dispatch(
      fetchNotifications({
        filter: activeFilter,
        page: currentPage + 1,
        perPage: pagination.per_page,
      }),
    );
  }, [
    activeFilter,
    currentPage,
    dispatch,
    hasNextPage,
    isRefreshing,
    loading.list,
    pagination.per_page,
  ]);

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
        footer={
          isLoadingMore ? (
            <View style={{ alignItems: "center", padding: theme.space[4] }}>
              <ActivityIndicator color={theme.semantic.text} />
            </View>
          ) : null
        }
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
        onEndReached={loadMoreNotifications}
        onMarkRead={markRead}
        onRefresh={refreshNotifications}
        readingIds={readingIds}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
}
