import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { apiRequest, notificationEndpoints } from "../../api";
import { EXPO_PUSH_PROJECT_ID } from "../../api/config";

const PUSH_DEVICE_ID_KEY = "spliteasy.pushDeviceId";
const PUSH_NOTIFICATIONS_ENABLED_KEY = "spliteasy.pushNotificationsEnabled";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function getNotificationData(notificationLike) {
  return (
    notificationLike?.request?.content?.data ||
    notificationLike?.notification?.request?.content?.data ||
    {}
  );
}

function createFallbackDeviceId() {
  return `${Platform.OS}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 12)}`;
}

async function createNativeDeviceId() {
  try {
    if (Platform.OS === "android") {
      return Application.getAndroidId();
    }

    if (Platform.OS === "ios") {
      return await Application.getIosIdForVendorAsync();
    }
  } catch {
    return null;
  }

  return null;
}

async function getStableDeviceId() {
  const storedDeviceId = await AsyncStorage.getItem(PUSH_DEVICE_ID_KEY);

  if (storedDeviceId) {
    return storedDeviceId;
  }

  const deviceId = (await createNativeDeviceId()) || createFallbackDeviceId();
  await AsyncStorage.setItem(PUSH_DEVICE_ID_KEY, deviceId);

  return deviceId;
}

function getAppVersion() {
  return Application.nativeApplicationVersion || "1.0.0";
}

export async function getPushNotificationsEnabledPreference() {
  const storedPreference = await AsyncStorage.getItem(
    PUSH_NOTIFICATIONS_ENABLED_KEY,
  );

  return storedPreference !== "false";
}

export async function setPushNotificationsEnabledPreference(isEnabled) {
  await AsyncStorage.setItem(
    PUSH_NOTIFICATIONS_ENABLED_KEY,
    isEnabled ? "true" : "false",
  );
}

export function extractNotificationPayload(notificationLike) {
  const data = getNotificationData(notificationLike);

  if (data.notification) {
    return data.notification;
  }

  if (data.payload) {
    return data.payload;
  }

  if (data.id && data.title) {
    return data;
  }

  return null;
}

export async function registerForExpoPushNotifications({
  shouldRequestPermission = true,
} = {}) {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  const currentPermissions = await Notifications.getPermissionsAsync();
  const canRequestPermission =
    shouldRequestPermission && currentPermissions.status !== "granted";
  const finalPermissions =
    currentPermissions.status === "granted"
      ? currentPermissions
      : canRequestPermission
        ? await Notifications.requestPermissionsAsync()
        : currentPermissions;

  if (finalPermissions.status !== "granted") {
    return {
      permissionStatus: finalPermissions.status,
      token: null,
    };
  }

  try {
    const tokenResponse = await Notifications.getExpoPushTokenAsync(
      EXPO_PUSH_PROJECT_ID ? { projectId: EXPO_PUSH_PROJECT_ID } : undefined,
    );

    return {
      permissionStatus: finalPermissions.status,
      token: tokenResponse.data,
    };
  } catch (error) {
    return {
      error,
      permissionStatus: finalPermissions.status,
      token: null,
    };
  }
}

export async function getExpoPushNotificationStatus() {
  const preferenceEnabled = await getPushNotificationsEnabledPreference();
  const permissions = await Notifications.getPermissionsAsync();

  return {
    permissionStatus: permissions.status,
    preferenceEnabled,
    pushEnabled: preferenceEnabled && permissions.status === "granted",
  };
}

export async function syncExpoPushToken({
  shouldRequestPermission = true,
} = {}) {
  const preferenceEnabled = await getPushNotificationsEnabledPreference();

  if (!preferenceEnabled) {
    return {
      permissionStatus: "disabled",
      preferenceEnabled,
      token: null,
    };
  }

  const registration = await registerForExpoPushNotifications({
    shouldRequestPermission,
  });

  if (!registration?.token) {
    return {
      ...registration,
      preferenceEnabled,
    };
  }

  await saveExpoPushToken(registration.token);

  return {
    ...registration,
    preferenceEnabled,
  };
}

export async function enableExpoPushNotifications() {
  await setPushNotificationsEnabledPreference(true);

  return syncExpoPushToken({ shouldRequestPermission: true });
}

export async function disableExpoPushNotifications() {
  await setPushNotificationsEnabledPreference(false);

  try {
    await unregisterExpoPushToken();
  } catch {
    // Keep local preference disabled even if the server token removal fails.
  }

  return getExpoPushNotificationStatus();
}

export async function saveExpoPushToken(pushToken) {
  if (!pushToken) {
    return null;
  }

  return apiRequest(notificationEndpoints.pushTokens, {
    method: "POST",
    body: {
      token: pushToken,
      platform: Platform.OS,
      device_id: await getStableDeviceId(),
      app_version: getAppVersion(),
    },
  });
}

export async function unregisterExpoPushToken() {
  return apiRequest(notificationEndpoints.pushTokens, {
    method: "DELETE",
  });
}

export function subscribeToExpoNotificationEvents({
  onNotification,
  onNotificationResponse,
}) {
  const receivedSubscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      onNotification?.(notification);
    },
  );
  const responseSubscription =
    Notifications.addNotificationResponseReceivedListener((response) => {
      onNotificationResponse?.(response);
    });

  return () => {
    receivedSubscription.remove();
    responseSubscription.remove();
  };
}
