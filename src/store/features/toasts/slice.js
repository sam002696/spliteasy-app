import { createSlice, nanoid } from "@reduxjs/toolkit";
import initialState from "./initialState";

const DEFAULT_TOAST_DURATION = 3200;

function createToastPayload(payload) {
  const input = typeof payload === "string" ? { message: payload } : payload;

  return {
    id: input.id || nanoid(),
    type: input.type || "info",
    title: input.title || null,
    message: input.message,
    duration: input.duration ?? DEFAULT_TOAST_DURATION,
  };
}

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    showToast: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(payload) {
        return {
          payload: createToastPayload(payload),
        };
      },
    },
    hideToast(state, action) {
      state.items = state.items.filter((toast) => toast.id !== action.payload);
    },
    clearToasts(state) {
      state.items = [];
    },
  },
});

export const { clearToasts, hideToast, showToast } = toastsSlice.actions;

export const showSuccessToast = (message, options = {}) =>
  showToast({ ...options, message, type: "success" });

export const showErrorToast = (message, options = {}) =>
  showToast({ ...options, message, type: "error" });

export const showInfoToast = (message, options = {}) =>
  showToast({ ...options, message, type: "info" });

export const showWarningToast = (message, options = {}) =>
  showToast({ ...options, message, type: "warning" });

export default toastsSlice.reducer;
