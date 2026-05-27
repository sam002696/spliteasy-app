import { createSlice } from "@reduxjs/toolkit";
import { readData } from "../../utils/readData";
import initialState from "./initialState";
import {
  createGroup,
  deleteGroup,
  fetchGroup,
  fetchGroupBalances,
  fetchGroupMembers,
  fetchGroups,
  inviteGroupMember,
  leaveGroup,
  removeGroupMember,
} from "./thunks";

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    clearGroupsError(state) {
      state.error = null;
    },
    setSelectedGroup(state, action) {
      state.selectedGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading.list = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading.list = false;
        state.items = readData(action.payload, []);
        state.message = action.payload.message;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload;
      })
      .addCase(createGroup.pending, (state) => {
        state.loading.create = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading.create = false;
        const group = readData(action.payload);

        if (group) {
          state.items.unshift(group);
          state.selectedGroup = group;
        }

        state.message = action.payload.message;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
      })
      .addCase(fetchGroup.pending, (state) => {
        state.loading.detail = true;
        state.error = null;
      })
      .addCase(fetchGroup.fulfilled, (state, action) => {
        state.loading.detail = false;
        state.selectedGroup = readData(action.payload);
        state.message = action.payload.message;
      })
      .addCase(fetchGroup.rejected, (state, action) => {
        state.loading.detail = false;
        state.error = action.payload;
      })
      .addCase(deleteGroup.pending, (state) => {
        state.loading.delete = true;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.items = state.items.filter(
          (group) => group.id !== action.payload.groupId
        );

        if (state.selectedGroup?.id === action.payload.groupId) {
          state.selectedGroup = null;
        }

        state.message = action.payload.response.message;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
      })
      .addCase(leaveGroup.pending, (state) => {
        state.loading.leave = true;
      })
      .addCase(leaveGroup.fulfilled, (state, action) => {
        state.loading.leave = false;
        state.items = state.items.filter(
          (group) => group.id !== action.payload.groupId
        );
        state.message = action.payload.response.message;
      })
      .addCase(leaveGroup.rejected, (state, action) => {
        state.loading.leave = false;
        state.error = action.payload;
      })
      .addCase(fetchGroupMembers.pending, (state) => {
        state.loading.members = true;
      })
      .addCase(fetchGroupMembers.fulfilled, (state, action) => {
        state.loading.members = false;
        state.membersByGroupId[action.payload.groupId] = readData(
          action.payload.response,
          []
        );
        state.message = action.payload.response.message;
      })
      .addCase(fetchGroupMembers.rejected, (state, action) => {
        state.loading.members = false;
        state.error = action.payload;
      })
      .addCase(removeGroupMember.pending, (state) => {
        state.loading.removeMember = true;
      })
      .addCase(removeGroupMember.fulfilled, (state, action) => {
        state.loading.removeMember = false;
        const members = state.membersByGroupId[action.payload.groupId] || [];

        state.membersByGroupId[action.payload.groupId] = members.filter(
          (member) => member.id !== action.payload.memberId
        );

        state.message = action.payload.response.message;
      })
      .addCase(removeGroupMember.rejected, (state, action) => {
        state.loading.removeMember = false;
        state.error = action.payload;
      })
      .addCase(inviteGroupMember.pending, (state) => {
        state.loading.invite = true;
      })
      .addCase(inviteGroupMember.fulfilled, (state, action) => {
        state.loading.invite = false;
        state.message = action.payload.response.message;
      })
      .addCase(inviteGroupMember.rejected, (state, action) => {
        state.loading.invite = false;
        state.error = action.payload;
      })
      .addCase(fetchGroupBalances.pending, (state) => {
        state.loading.balances = true;
      })
      .addCase(fetchGroupBalances.fulfilled, (state, action) => {
        state.loading.balances = false;
        state.balancesByGroupId[action.payload.groupId] = readData(
          action.payload.response,
          []
        );
        state.message = action.payload.response.message;
      })
      .addCase(fetchGroupBalances.rejected, (state, action) => {
        state.loading.balances = false;
        state.error = action.payload;
      });
  },
});

export const { clearGroupsError, setSelectedGroup } = groupsSlice.actions;

export default groupsSlice.reducer;
