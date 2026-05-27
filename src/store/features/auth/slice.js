import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { getUserFromPayload } from "./authPayload";
import {
  bootstrapAuth,
  fetchCurrentUser,
  login,
  logout,
  register,
} from "./thunks";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    setAuthToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapAuth.pending, (state) => {
        state.isBootstrapping = true;
        state.error = null;
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.isBootstrapping = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = Boolean(action.payload.token);
        state.message = action.payload.message || null;
      })
      .addCase(bootstrapAuth.rejected, (state, action) => {
        state.isBootstrapping = false;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading.register = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading.register = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = Boolean(action.payload.token);
        state.message = action.payload.response.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading.register = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading.login = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading.login = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = Boolean(action.payload.token);
        state.message = action.payload.response.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading.login = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading.logout = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading.logout = false;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.message = action.payload.message;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading.logout = false;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading.me = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading.me = false;
        state.user = getUserFromPayload(action.payload);
        state.message = action.payload.message;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading.me = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthError, setAuthToken } = authSlice.actions;

export default authSlice.reducer;
