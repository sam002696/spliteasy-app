export const authEndpoints = {
  register: "/auth/register",
  login: "/auth/login",
  logout: "/auth/logout",
  me: "/auth/me",
};

export const groupEndpoints = {
  list: "/groups",
  create: "/groups",
  detail: (groupId) => `/groups/${groupId}`,
  remove: (groupId) => `/groups/${groupId}`,
  leave: (groupId) => `/groups/${groupId}/leave`,
  members: (groupId) => `/groups/${groupId}/members`,
  removeMember: (groupId, memberId) => `/groups/${groupId}/members/${memberId}`,
  invite: (groupId) => `/groups/${groupId}/invite`,
  balances: (groupId) => `/groups/${groupId}/balances`,
};

export const expenseEndpoints = {
  listByGroup: (groupId) => `/groups/${groupId}/expenses`,
  create: (groupId) => `/groups/${groupId}/expenses`,
  detail: (expenseId) => `/expenses/${expenseId}`,
  remove: (expenseId) => `/expenses/${expenseId}`,
};

export const invitationEndpoints = {
  pending: "/group-invitations/pending",
  accept: (invitationId) => `/group-invitations/${invitationId}/accept`,
  reject: (invitationId) => `/group-invitations/${invitationId}/reject`,
};
