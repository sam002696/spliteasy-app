import { createSlice } from "@reduxjs/toolkit";
import { readData } from "../../utils/readData";
import initialState from "./initialState";
import {
  acceptInvitation,
  fetchPendingInvitations,
  rejectInvitation,
} from "./thunks";

const invitationsSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    clearInvitationsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingInvitations.pending, (state) => {
        state.loading.pending = true;
        state.error = null;
      })
      .addCase(fetchPendingInvitations.fulfilled, (state, action) => {
        state.loading.pending = false;
        state.pending = readData(action.payload, []);
        state.message = action.payload.message;
      })
      .addCase(fetchPendingInvitations.rejected, (state, action) => {
        state.loading.pending = false;
        state.error = action.payload;
      })
      .addCase(acceptInvitation.pending, (state, action) => {
        state.loading.accept = true;
        state.loading.acceptById[action.meta.arg] = true;
      })
      .addCase(acceptInvitation.fulfilled, (state, action) => {
        state.loading.accept = false;
        delete state.loading.acceptById[action.payload.invitationId];
        state.pending = state.pending.filter(
          (invitation) => invitation.id !== action.payload.invitationId
        );
        state.message = action.payload.response.message;
      })
      .addCase(acceptInvitation.rejected, (state, action) => {
        state.loading.accept = false;
        delete state.loading.acceptById[action.meta.arg];
        state.error = action.payload;
      })
      .addCase(rejectInvitation.pending, (state, action) => {
        state.loading.reject = true;
        state.loading.rejectById[action.meta.arg] = true;
      })
      .addCase(rejectInvitation.fulfilled, (state, action) => {
        state.loading.reject = false;
        delete state.loading.rejectById[action.payload.invitationId];
        state.pending = state.pending.filter(
          (invitation) => invitation.id !== action.payload.invitationId
        );
        state.message = action.payload.response.message;
      })
      .addCase(rejectInvitation.rejected, (state, action) => {
        state.loading.reject = false;
        delete state.loading.rejectById[action.meta.arg];
        state.error = action.payload;
      });
  },
});

export const { clearInvitationsError } = invitationsSlice.actions;

export default invitationsSlice.reducer;
