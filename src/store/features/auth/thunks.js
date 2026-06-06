import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest, authEndpoints, createThunkApi } from "../../../api";
import {
  clearStoredAuthToken,
  getStoredAuthToken,
  setStoredAuthToken,
} from "../../../api/tokenStorage";
import { unregisterExpoPushToken } from "../../../services/push/expoNotifications";
import {
  dispatchSuccessToast,
  rejectWithErrorToast,
} from "../../utils/toastFeedback";
import { getAuthTokenFromPayload, getUserFromPayload } from "./authPayload";

export const bootstrapAuth = createAsyncThunk(
  "auth/bootstrap",
  async (_, thunkApi) => {
    try {
      const token = await getStoredAuthToken();

      if (!token) {
        return { token: null, user: null };
      }

      const api = createThunkApi({
        ...thunkApi,
        getState: () => ({
          ...thunkApi.getState(),
          auth: {
            ...thunkApi.getState().auth,
            token,
          },
        }),
      });

      const response = await api.get(authEndpoints.me);

      return {
        token,
        user: getUserFromPayload(response),
        message: response.message,
      };
    } catch (error) {
      await clearStoredAuthToken();
      return thunkApi.rejectWithValue({
        status: "error",
        message: error?.message || "Unable to restore session",
        data: null,
      });
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.post(authEndpoints.register, credentials);
      const token = getAuthTokenFromPayload(response);

      if (token) {
        await setStoredAuthToken(token);
      }

      dispatchSuccessToast(thunkApi, response, "Account created successfully.");

      return {
        response,
        token,
        user: getUserFromPayload(response),
      };
    } catch (error) {
      return rejectWithErrorToast(thunkApi, error, "Registration failed");
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.post(authEndpoints.login, credentials);
      const token = getAuthTokenFromPayload(response);

      if (token) {
        await setStoredAuthToken(token);
      }

      const profileResponse = token
        ? await apiRequest(authEndpoints.me, {
            method: "GET",
            token,
          })
        : null;

      dispatchSuccessToast(thunkApi, response, "Logged in successfully.");

      return {
        response,
        token,
        user: getUserFromPayload(profileResponse || response),
      };
    } catch (error) {
      return rejectWithErrorToast(thunkApi, error, "Login failed");
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  const api = createThunkApi(thunkApi);

  try {
    await unregisterExpoPushToken().catch(() => {});
    const response = await api.post(authEndpoints.logout);
    await clearStoredAuthToken();
    dispatchSuccessToast(thunkApi, response, "Logged out successfully.");
    return response;
  } catch (error) {
    await clearStoredAuthToken();
    return rejectWithErrorToast(thunkApi, error, "Logout failed");
  }
});

export const fetchCurrentUser = createAsyncThunk(
  "auth/me",
  async (_, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      return await api.get(authEndpoints.me);
    } catch (error) {
      return rejectWithErrorToast(thunkApi, error, "Unable to fetch profile");
    }
  },
);
