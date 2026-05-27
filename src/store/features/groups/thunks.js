import { createAsyncThunk } from "@reduxjs/toolkit";
import { createThunkApi, groupEndpoints } from "../../../api";

export const fetchGroups = createAsyncThunk("groups/list", async (_, thunkApi) => {
  const api = createThunkApi(thunkApi);

  try {
    return await api.get(groupEndpoints.list);
  } catch (error) {
    return api.reject(error, "Unable to fetch groups");
  }
});

export const createGroup = createAsyncThunk(
  "groups/create",
  async (groupPayload, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      return await api.post(groupEndpoints.create, groupPayload);
    } catch (error) {
      return api.reject(error, "Unable to create group");
    }
  }
);

export const fetchGroup = createAsyncThunk(
  "groups/detail",
  async (groupId, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      return await api.get(groupEndpoints.detail(groupId));
    } catch (error) {
      return api.reject(error, "Unable to fetch group");
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "groups/delete",
  async (groupId, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.delete(groupEndpoints.remove(groupId));
      return { response, groupId };
    } catch (error) {
      return api.reject(error, "Unable to delete group");
    }
  }
);

export const leaveGroup = createAsyncThunk(
  "groups/leave",
  async (groupId, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.post(groupEndpoints.leave(groupId));
      return { response, groupId };
    } catch (error) {
      return api.reject(error, "Unable to leave group");
    }
  }
);

export const fetchGroupMembers = createAsyncThunk(
  "groups/members",
  async (groupId, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.get(groupEndpoints.members(groupId));
      return { response, groupId };
    } catch (error) {
      return api.reject(error, "Unable to fetch group members");
    }
  }
);

export const removeGroupMember = createAsyncThunk(
  "groups/removeMember",
  async ({ groupId, memberId }, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.delete(
        groupEndpoints.removeMember(groupId, memberId)
      );
      return { response, groupId, memberId };
    } catch (error) {
      return api.reject(error, "Unable to remove group member");
    }
  }
);

export const inviteGroupMember = createAsyncThunk(
  "groups/invite",
  async ({ groupId, email }, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.post(groupEndpoints.invite(groupId), { email });
      return { response, groupId };
    } catch (error) {
      return api.reject(error, "Unable to invite member");
    }
  }
);

export const fetchGroupBalances = createAsyncThunk(
  "groups/balances",
  async (groupId, thunkApi) => {
    const api = createThunkApi(thunkApi);

    try {
      const response = await api.get(groupEndpoints.balances(groupId));
      return { response, groupId };
    } catch (error) {
      return api.reject(error, "Unable to fetch group balances");
    }
  }
);
