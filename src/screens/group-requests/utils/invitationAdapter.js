const categoryToneByName = {
  Family: "lime",
  Friends: "orange",
  Movie: "orange",
  Roommates: "lime",
  Team: "lime",
  Travel: "orange",
};

function formatDateLabel(value) {
  if (!value) {
    return "Pending";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Pending";
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

export function mapInvitationToRequest(invitation) {
  const group = invitation.group || {};
  const invitedBy = invitation.invited_by || {};

  return {
    id: invitation.id,
    groupId: group.id,
    groupName: group.name || "Group invitation",
    category: group.category || "Group",
    categoryTone: categoryToneByName[group.category] || "lime",
    invitedByName: invitedBy.name || invitedBy.email || "A SplitEasy user",
    status: invitation.status || "pending",
    requestedAt: formatDateLabel(invitation.created_at),
    expenseCount: group.expense_counts?.total || 0,
    memberCount:
      (group.members_preview?.members || []).length +
      (group.members_preview?.remaining_count || 0),
  };
}
