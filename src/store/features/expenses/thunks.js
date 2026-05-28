import { createAsyncThunk } from "@reduxjs/toolkit";
import { createThunkApi, expenseEndpoints } from "../../../api";
import {
  dispatchSuccessToast,
  rejectWithErrorToast,
} from "../../utils/toastFeedback";

export const fetchGroupExpenses = createAsyncThunk(
  "expenses/listByGroup",
  async (groupId, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.get(expenseEndpoints.listByGroup(groupId));
      return { response, groupId };
    } catch (error) {
      return rejectWithErrorToast(thunkApi, error, "Unable to fetch expenses");
    }
  }
);

export const createExpense = createAsyncThunk(
  "expenses/create",
  async ({ groupId, expense }, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.post(expenseEndpoints.create(groupId), expense);
      dispatchSuccessToast(thunkApi, response, "Expense created successfully.");
      return { response, groupId };
    } catch (error) {
      return rejectWithErrorToast(thunkApi, error, "Unable to create expense");
    }
  }
);

export const fetchExpense = createAsyncThunk(
  "expenses/detail",
  async (expenseId, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      return await api.get(expenseEndpoints.detail(expenseId));
    } catch (error) {
      return rejectWithErrorToast(thunkApi, error, "Unable to fetch expense");
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async ({ expenseId, groupId }, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.delete(expenseEndpoints.remove(expenseId));
      dispatchSuccessToast(thunkApi, response, "Expense deleted successfully.");
      return { response, expenseId, groupId };
    } catch (error) {
      return rejectWithErrorToast(thunkApi, error, "Unable to delete expense");
    }
  }
);
