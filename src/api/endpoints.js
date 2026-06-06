export const authEndpoints = {
  register: "/auth/register",
  login: "/auth/login",
  logout: "/auth/logout",
  me: "/auth/me",
};

export const homeEndpoints = {
  dashboard: "/home",
};

export const notificationEndpoints = {
  list: ({ filter = "all", page = 1, perPage = 20 } = {}) =>
    `/notifications?filter=${encodeURIComponent(filter)}&per_page=${encodeURIComponent(
      perPage,
    )}&page=${encodeURIComponent(page)}`,
  markRead: (notificationId) => `/notifications/${notificationId}/read`,
  markAllRead: "/notifications/read-all",
  pushTokens: "/notifications/push-tokens",
};

export const groupEndpoints = {
  list: (filter = "all") => `/groups?filter=${encodeURIComponent(filter)}`,
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

export const balanceEndpoints = {
  list: (filter = "open") => `/balances?filter=${encodeURIComponent(filter)}`,
  remind: (groupId, userId) =>
    `/balances/groups/${groupId}/users/${userId}/remind`,
  settle: (groupId, userId) =>
    `/balances/groups/${groupId}/users/${userId}/settle`,
};

export const invitationEndpoints = {
  pending: "/group-invitations/pending",
  accept: (invitationId) => `/group-invitations/${invitationId}/accept`,
  reject: (invitationId) => `/group-invitations/${invitationId}/reject`,
};
