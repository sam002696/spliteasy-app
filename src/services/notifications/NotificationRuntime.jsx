import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
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
  registerForExpoPushNotifications,
  subscribeToExpoNotificationEvents,
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

    registerForExpoPushNotifications().catch(() => {});

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

  return null;
}
