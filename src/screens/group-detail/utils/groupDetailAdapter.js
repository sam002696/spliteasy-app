const currencySymbols = {
  BDT: "৳",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const categoryToneByName = {
  Family: "lime",
  Friends: "orange",
  Movie: "orange",
  Roommates: "lime",
  Team: "lime",
  Travel: "orange",
};

function formatAmount(amount, currency = "BDT") {
  const value = Number(amount || 0);
  const symbol = currencySymbols[currency] || currency;

  return `${symbol} ${value.toLocaleString("en-US", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  })}`;
}

function formatDateLabel(value) {
  if (!value) {
    return "No date";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

function getPositionTone(type) {
  if (type === "you_owe") {
    return "negative";
  }

  if (type === "owed_to_you") {
    return "positive";
  }

  return "settled";
}

function getMemberStatus(member) {
  return member.role === "owner" ? "Owner" : "Member";
}

function getMemberBalance(member, balancesData) {
  const balances = balancesData?.balances || [];
  const balance = balances.find((item) => item.user?.id === member.id);

  if (!balance) {
    return {
      balance: "No open balance",
      tone: "textMuted",
    };
  }

  return {
    balance: `${balance.label} ${formatAmount(balance.amount, balancesData?.base_currency)}`,
    tone: getPositionTone(balance.type),
  };
}

export function mapGroupSummary(group, balancesData) {
  const position =
    balancesData?.current_user_position || group.summary?.current_user_position || {};
  const totalSpend =
    balancesData?.total_group_spend || group.summary?.total_group_spend || 0;
  const openCount =
    group.expense_counts?.open ?? balancesData?.open_unsettled_count ?? 0;
  const currency = balancesData?.base_currency || group.base_currency;

  return {
    yourPositionLabel: position.label || "No expenses yet",
    yourPositionAmount: formatAmount(position.amount, currency),
    yourPositionTone: getPositionTone(position.type),
    totalSpend: formatAmount(totalSpend, currency),
    unsettled: `${openCount} open`,
  };
}

export function mapGroupExpenses(expenses = []) {
  return expenses.map((expense) => ({
    id: String(expense.id),
    title: expense.description,
    paidBy: expense.paid_by?.name || "Unknown",
    date: formatDateLabel(expense.expense_date || expense.created_at),
    amount: formatAmount(expense.amount, expense.currency),
    yourShare: formatAmount(expense.your_share, expense.currency),
    status: expense.status === "settled" ? "Settled" : "Open",
  }));
}

export function mapGroupBalances(balancesData) {
  const balances = balancesData?.balances || [];
  const totalSpend = Number(balancesData?.total_group_spend || 0);

  return balances.map((balance) => {
    const tone = getPositionTone(balance.type);
    const amount = Number(balance.amount || 0);

    return {
      id: `${balance.user?.id || balance.label}:${balance.type || "balance"}`,
      groupId: balancesData?.group_id,
      userId: balance.user?.id,
      person: balance.user?.name || "Unknown",
      note: balance.label,
      amount: formatAmount(balance.amount, balancesData?.base_currency),
      tone,
      progress: totalSpend > 0 ? Math.min(amount / totalSpend, 1) : 0,
      action: tone === "negative" ? "Mark settled" : "Remind",
      canRemind:
        tone === "positive" &&
        Boolean(balancesData?.group_id && balance.user?.id),
      canSettle:
        tone === "negative" &&
        Boolean(balancesData?.group_id && balance.user?.id),
    };
  });
}

export function mapGroupMembers(members = [], balancesData, currentUserId) {
  return members.map((member) => {
    const balance = getMemberBalance(member, balancesData);

    return {
      id: String(member.id),
      isCurrentUser: String(member.id) === String(currentUserId),
      name: member.name,
      email: member.email,
      status: getMemberStatus(member),
      ...balance,
    };
  });
}

export function mapGroupDetail({
  balancesData,
  currentUserId,
  expenses,
  group,
  members,
}) {
  return {
    id: String(group.id),
    ownerId: group.owner_id,
    name: group.name,
    category: group.category,
    categoryTone: categoryToneByName[group.category] || "lime",
    memberCount: group.members_count || members.length || 0,
    summary: mapGroupSummary(group, balancesData),
    expenses: mapGroupExpenses(expenses),
    balances: mapGroupBalances(balancesData),
    members: mapGroupMembers(members, balancesData, currentUserId),
  };
}
