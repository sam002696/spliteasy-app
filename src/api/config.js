export const API_PREFIX = "/api/v1";

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "";

export const API_TIMEOUT_MS = 30000;

function parseApiBaseUrl() {
  if (!API_BASE_URL) {
    return null;
  }

  try {
    return new URL(API_BASE_URL);
  } catch {
    return null;
  }
}

const apiBaseUrl = parseApiBaseUrl();

export const BROADCAST_AUTH_PATH =
  process.env.EXPO_PUBLIC_BROADCAST_AUTH_PATH || "/broadcasting/auth";

export const REVERB_APP_KEY =
  process.env.EXPO_PUBLIC_REVERB_APP_KEY ||
  process.env.EXPO_PUBLIC_PUSHER_APP_KEY ||
  "";

export const REVERB_HOST =
  process.env.EXPO_PUBLIC_REVERB_HOST || apiBaseUrl?.hostname || "localhost";

export const REVERB_PORT = Number(process.env.EXPO_PUBLIC_REVERB_PORT || 8080);

export const REVERB_SCHEME =
  process.env.EXPO_PUBLIC_REVERB_SCHEME ||
  apiBaseUrl?.protocol?.replace(":", "") ||
  "http";

export const EXPO_PUSH_PROJECT_ID =
  process.env.EXPO_PUBLIC_EAS_PROJECT_ID ||
  process.env.EXPO_PUBLIC_EXPO_PROJECT_ID ||
  "";
