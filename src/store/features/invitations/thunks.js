import { createAsyncThunk } from "@reduxjs/toolkit";
import { createThunkApi, invitationEndpoints } from "../../../api";
import {
  dispatchSuccessToast,
  rejectWithErrorToast,
} from "../../utils/toastFeedback";

export const fetchPendingInvitations = createAsyncThunk(
  "invitations/pending",
  async (_, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      return await api.get(invitationEndpoints.pending);
    } catch (error) {
      return rejectWithErrorToast(
        thunkApi,
        error,
        "Unable to fetch pending invitations"
      );
    }
  }
);

export const acceptInvitation = createAsyncThunk(
  "invitations/accept",
  async (invitationId, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.post(invitationEndpoints.accept(invitationId));
      dispatchSuccessToast(thunkApi, response, "Invitation accepted.");
      return { response, invitationId };
    } catch (error) {
      return rejectWithErrorToast(thunkApi, error, "Unable to accept invitation");
    }
  }
);

export const rejectInvitation = createAsyncThunk(
  "invitations/reject",
  async (invitationId, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.post(invitationEndpoints.reject(invitationId));
      dispatchSuccessToast(thunkApi, response, "Invitation rejected.");
      return { response, invitationId };
    } catch (error) {
      return rejectWithErrorToast(thunkApi, error, "Unable to reject invitation");
    }
  }
);
