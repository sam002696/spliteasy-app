import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { AppState } from "react-native";
import {
  balanceFilters,
  fetchBalances,
  fetchGroups,
  fetchHomeDashboard,
  fetchPendingInvitations,
  groupFilters,
  receiveNotification,
  selectCurrentUser,
  selectIsAuthenticated,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import {
  extractNotificationPayload,
  subscribeToExpoNotificationEvents,
  syncExpoPushToken,
} from "../push/expoNotifications";
import {
  disconnectRealtimeNotifications,
  subscribeToUserNotifications,
} from "../realtime/reverbNotifications";

function normalizeIncomingNotification(payload) {
  return payload?.notification || payload?.data?.notification || payload?.data || payload;
}

function shouldRefreshInvitations(type) {
  return String(type || "").startsWith("invitation.");
}

function shouldRefreshMoneyData(type) {
  return [
    "balance.",
    "expense.",
    "group.",
    "invitation.",
    "member.",
    "settlement.",
  ].some((prefix) => String(type || "").startsWith(prefix));
}

function logPushSyncError(error) {
  if (__DEV__) {
    console.warn("[Push] Unable to sync Expo push token", error?.message || error);
  }
}

export function NotificationRuntime() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userId = currentUser?.id;

  const handleNotification = useCallback(
    (payload) => {
      const notification = normalizeIncomingNotification(payload);

      if (!notification?.id) {
        return;
      }

      dispatch(receiveNotification(notification));
      dispatch(fetchHomeDashboard());

      if (shouldRefreshInvitations(notification.type)) {
        dispatch(fetchPendingInvitations());
      }

      if (shouldRefreshMoneyData(notification.type)) {
        dispatch(fetchGroups(groupFilters.all));
        dispatch(fetchBalances(balanceFilters.open));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      disconnectRealtimeNotifications();
      return undefined;
    }

    return subscribeToUserNotifications(userId, handleNotification);
  }, [handleNotification, isAuthenticated, userId]);

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    syncExpoPushToken({ shouldRequestPermission: true }).catch(logPushSyncError);

    return subscribeToExpoNotificationEvents({
      onNotification: (notification) => {
        handleNotification(extractNotificationPayload(notification));
      },
      onNotificationResponse: (response) => {
        handleNotification(extractNotificationPayload(response));
        router.push("/notifications");
      },
    });
  }, [handleNotification, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        syncExpoPushToken({ shouldRequestPermission: false }).catch(
          logPushSyncError,
        );
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated]);

  return null;
}
