import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { EXPO_PUSH_PROJECT_ID } from "../../api/config";

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

export async function registerForExpoPushNotifications() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  const currentPermissions = await Notifications.getPermissionsAsync();
  const finalPermissions =
    currentPermissions.status === "granted"
      ? currentPermissions
      : await Notifications.requestPermissionsAsync();

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
