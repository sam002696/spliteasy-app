import { createAsyncThunk } from "@reduxjs/toolkit";
import { createThunkApi, notificationEndpoints } from "../../../api";
import {
  dispatchSuccessToast,
  rejectWithErrorToast,
} from "../../utils/toastFeedback";

export const notificationFilters = {
  all: "all",
  unread: "unread",
  read: "read",
};

export const fetchNotifications = createAsyncThunk(
  "notifications/list",
  async (
    {
      filter = notificationFilters.all,
      page = 1,
      perPage = 20,
    } = {},
    thunkApi,
  ) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.get(
        notificationEndpoints.list({ filter, page, perPage }),
      );

      return {
        filter,
        page,
        response,
      };
    } catch (error) {
      return rejectWithErrorToast(
        thunkApi,
        error,
        "Unable to fetch notifications",
      );
    }
  },
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markRead",
  async (notificationId, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.patch(
        notificationEndpoints.markRead(notificationId),
      );

      return {
        notificationId,
        response,
      };
    } catch (error) {
      return rejectWithErrorToast(
        thunkApi,
        error,
        "Unable to mark notification as read",
      );
    }
  },
);

export const markAllNotificationsRead = createAsyncThunk(
  "notifications/markAllRead",
  async (_, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.patch(notificationEndpoints.markAllRead);
      dispatchSuccessToast(thunkApi, response, "All notifications marked read.");

      return response;
    } catch (error) {
      return rejectWithErrorToast(
        thunkApi,
        error,
        "Unable to mark all notifications as read",
      );
    }
  },
);
