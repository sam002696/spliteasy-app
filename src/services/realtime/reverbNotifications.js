import EchoModule from "laravel-echo";
import PusherModule from "pusher-js/react-native";
import {
  API_BASE_URL,
  BROADCAST_AUTH_PATH,
  REVERB_APP_KEY,
  REVERB_HOST,
  REVERB_PORT,
  REVERB_SCHEME,
} from "../../api/config";
import { getStoredAuthToken } from "../../api/tokenStorage";

const NOTIFICATION_EVENT = ".notification.created";

let echoClient = null;

const Echo = EchoModule?.default || EchoModule;
const Pusher =
  PusherModule?.default || PusherModule?.Pusher || PusherModule;

function getApiOrigin() {
  if (!API_BASE_URL) {
    return "";
  }

  try {
    const url = new URL(API_BASE_URL);
    return url.origin;
  } catch {
    return API_BASE_URL.replace(/\/$/, "");
  }
}

function buildBroadcastAuthUrl() {
  return `${getApiOrigin()}${BROADCAST_AUTH_PATH}`;
}

async function authorizePrivateChannel(socketId, channelName) {
  const token = await getStoredAuthToken();

  const response = await fetch(buildBroadcastAuthUrl(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      socket_id: socketId,
      channel_name: channelName,
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    const error = new Error(payload?.message || "Unable to authorize channel");
    error.payload = payload;
    throw error;
  }

  return payload;
}

function createEchoClient() {
  if (!REVERB_APP_KEY) {
    return null;
  }

  const usesTls = REVERB_SCHEME === "https";

  return new Echo({
    Pusher,
    broadcaster: "reverb",
    withoutInterceptors: true,
    key: REVERB_APP_KEY,
    wsHost: REVERB_HOST,
    wsPort: REVERB_PORT,
    wssPort: REVERB_PORT,
    forceTLS: usesTls,
    encrypted: usesTls,
    enabledTransports: usesTls ? ["wss"] : ["ws"],
    disableStats: true,
    authorizer: (channel) => ({
      authorize: async (socketId, callback) => {
        try {
          const authPayload = await authorizePrivateChannel(
            socketId,
            channel.name,
          );

          callback(false, authPayload);
        } catch (error) {
          callback(true, error);
        }
      },
    }),
  });
}

function getEchoClient() {
  if (!echoClient) {
    echoClient = createEchoClient();
  }

  return echoClient;
}

export function subscribeToUserNotifications(userId, onNotification) {
  if (!userId || !onNotification) {
    return () => {};
  }

  const echo = getEchoClient();

  if (!echo) {
    return () => {};
  }

  const channelName = `users.${userId}.notifications`;
  const channel = echo.private(channelName);

  channel.listen(NOTIFICATION_EVENT, onNotification);

  return () => {
    channel.stopListening(NOTIFICATION_EVENT);
    echo.leave(channelName);
  };
}

export function disconnectRealtimeNotifications() {
  if (!echoClient) {
    return;
  }

  echoClient.disconnect();
  echoClient = null;
}
