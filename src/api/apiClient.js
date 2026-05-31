import { API_BASE_URL, API_PREFIX, API_TIMEOUT_MS } from "./config";
import { getStoredAuthToken } from "./tokenStorage";

function buildUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${API_PREFIX}${normalizedPath}`;
}

function extractToken(state) {
  return state?.auth?.token || null;
}

function normalizeApiError(error, fallbackMessage = "Something went wrong") {
  if (error?.payload) {
    return error.payload;
  }

  return {
    status: "error",
    message: error?.message || fallbackMessage,
    data: error?.data || null,
  };
}

async function parseResponse(response) {
  const text = await response.text();

  if (!text) {
    return {
      status: response.ok ? "success" : "error",
      message: response.statusText,
      data: null,
    };
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      status: response.ok ? "success" : "error",
      message: text,
      data: null,
    };
  }
}

export async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    body,
    token,
    signal,
    headers = {},
  } = options;

  const controller = signal ? null : new AbortController();
  const timeoutId = controller
    ? setTimeout(() => controller.abort(), API_TIMEOUT_MS)
    : null;

  try {
    const authToken = token === undefined ? await getStoredAuthToken() : token;
    const requestHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    };

    if (authToken) {
      requestHeaders.Authorization = `Bearer ${authToken}`;
    }

    const response = await fetch(buildUrl(path), {
      method,
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: signal || controller?.signal,
    });

    const payload = await parseResponse(response);

    if (!response.ok) {
      const error = new Error(payload?.message || response.statusText);
      error.payload = {
        status: payload?.status || "error",
        message: payload?.message || response.statusText,
        data: payload?.data || null,
      };
      throw error;
    }

    return payload;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

export function createThunkApi(thunkApi) {
  const token = extractToken(thunkApi.getState()) || undefined;

  return {
    get: (path) => apiRequest(path, { method: "GET", token }),
    post: (path, body) => apiRequest(path, { method: "POST", body, token }),
    patch: (path, body) => apiRequest(path, { method: "PATCH", body, token }),
    delete: (path) => apiRequest(path, { method: "DELETE", token }),
    reject: (error, fallbackMessage) =>
      thunkApi.rejectWithValue(normalizeApiError(error, fallbackMessage)),
  };
}

export { normalizeApiError };
