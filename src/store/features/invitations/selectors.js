export const selectInvitations = (state) => state.invitations;
export const selectPendingInvitations = (state) => state.invitations.pending;
export const selectPendingInvitationsCount = (state) =>
  state.invitations.pending.length;
