import { usePathname, useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
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
  clearLastExpoNotificationResponse,
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

function getNotificationResponseKey(response, notification) {
  return String(
    response?.notification?.request?.identifier ||
      notification?.id ||
      notification?.uuid ||
      "",
  );
}

const RESPONSE_DEDUPE_WINDOW_MS = 3000;

export function NotificationRuntime() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const lastHandledResponseRef = useRef({ handledAt: 0, key: null });
  const pathnameRef = useRef(pathname);
  const userId = currentUser?.id;

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const handleNotification = useCallback(
    (payload) => {
      const notification = normalizeIncomingNotification(payload);

      if (!notification?.id) {
        return null;
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

      return notification;
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

    const unsubscribe = subscribeToExpoNotificationEvents({
      onNotification: (notification) => {
        handleNotification(extractNotificationPayload(notification));
      },
      onNotificationResponse: (response) => {
        const notification = handleNotification(
          extractNotificationPayload(response),
        );
        const responseKey = getNotificationResponseKey(response, notification);
        const now = Date.now();
        const lastResponse = lastHandledResponseRef.current;
        const alreadyHandledRecently =
          lastResponse.key === responseKey &&
          now - lastResponse.handledAt < RESPONSE_DEDUPE_WINDOW_MS;

        if (!responseKey || alreadyHandledRecently) {
          clearLastExpoNotificationResponse();
          return;
        }

        lastHandledResponseRef.current = { handledAt: now, key: responseKey };
        clearLastExpoNotificationResponse();

        if (pathnameRef.current !== "/notifications") {
          router.push("/notifications");
        }
      },
    });

    return () => {
      unsubscribe();
      lastHandledResponseRef.current = { handledAt: 0, key: null };
    };
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
