import { createAsyncThunk } from "@reduxjs/toolkit";
import { createThunkApi, homeEndpoints } from "../../../api";
import { rejectWithErrorToast } from "../../utils/toastFeedback";

export const fetchHomeDashboard = createAsyncThunk(
  "home/dashboard",
  async (_, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      return await api.get(homeEndpoints.dashboard);
    } catch (error) {
      return rejectWithErrorToast(thunkApi, error, "Unable to fetch home data");
    }
  }
);
