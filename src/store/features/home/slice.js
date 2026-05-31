import { createSlice } from "@reduxjs/toolkit";
import { readData } from "../../utils/readData";
import initialState from "./initialState";
import { fetchHomeDashboard } from "./thunks";

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    clearHomeError(state) {
      state.error = null;
    },
    resetHome(state) {
      state.summary = initialState.summary;
      state.activeGroupsCount = initialState.activeGroupsCount;
      state.activeGroups = initialState.activeGroups;
      state.recentActivities = initialState.recentActivities;
      state.error = initialState.error;
      state.message = initialState.message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeDashboard.pending, (state) => {
        state.loading.dashboard = true;
        state.error = null;
      })
      .addCase(fetchHomeDashboard.fulfilled, (state, action) => {
        const data = readData(action.payload, {});

        state.loading.dashboard = false;
        state.summary = data.summary || null;
        state.activeGroupsCount = data.active_groups_count || 0;
        state.activeGroups = data.active_groups || [];
        state.recentActivities = data.recent_activities || [];
        state.message = action.payload.message;
      })
      .addCase(fetchHomeDashboard.rejected, (state, action) => {
        state.loading.dashboard = false;
        state.error = action.payload;
      });
  },
});

export const { clearHomeError, resetHome } = homeSlice.actions;

export default homeSlice.reducer;
