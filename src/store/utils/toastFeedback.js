import { normalizeApiError } from "../../api";
import { showErrorToast, showSuccessToast } from "../features/toasts";

export function dispatchSuccessToast(thunkApi, response, fallbackMessage) {
  const message = response?.message || fallbackMessage;

  if (message) {
    thunkApi.dispatch(showSuccessToast(message));
  }
}

export function rejectWithErrorToast(thunkApi, error, fallbackMessage) {
  const payload = normalizeApiError(error, fallbackMessage);
  thunkApi.dispatch(showErrorToast(payload.message || fallbackMessage));

  return thunkApi.rejectWithValue(payload);
}
