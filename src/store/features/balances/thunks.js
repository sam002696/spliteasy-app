import { createAsyncThunk } from "@reduxjs/toolkit";
import { balanceEndpoints, createThunkApi } from "../../../api";
import { rejectWithErrorToast } from "../../utils/toastFeedback";

export const balanceFilters = {
  open: "open",
  youOwe: "you_owe",
  settled: "settled",
};

export const fetchBalances = createAsyncThunk(
  "balances/list",
  async (filter = balanceFilters.open, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.get(balanceEndpoints.list(filter));
      return { response, filter };
    } catch (error) {
      return rejectWithErrorToast(thunkApi, error, "Unable to fetch balances");
    }
  }
);
