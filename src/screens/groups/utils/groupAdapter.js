const currencySymbols = {
  BDT: "৳",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const categoryToneByName = {
  Roommates: "lime",
  Family: "lime",
  Friends: "orange",
  Movie: "orange",
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
    return "No activity";
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

function getBalanceTone(positionType) {
  if (positionType === "you_owe") {
    return "negative";
  }

  if (positionType === "owed_to_you") {
    return "positive";
  }

  return "settled";
}

function getMembers(group) {
  return (group.members_preview?.members || []).map(
    (member) => member.name || member.email || member.initials
  );
}

export function mapApiGroupToListItem(group) {
  const position = group.summary?.current_user_position || {};
  const latestExpense = group.latest_expense;
  const balanceTone = getBalanceTone(position.type);
  const positionAmount = formatAmount(position.amount, group.base_currency);
  const latestExpenseAmount = latestExpense
    ? formatAmount(latestExpense.amount, latestExpense.currency || group.base_currency)
    : null;

  return {
    id: String(group.id),
    name: group.name,
    category: group.category,
    categoryTone: categoryToneByName[group.category] || "lime",
    memberCount: group.members_count || 0,
    members: getMembers(group),
    latestExpense: latestExpense
      ? `${latestExpense.description} · ${latestExpenseAmount}`
      : "No expenses yet",
    updatedAt: formatDateLabel(latestExpense?.created_at || group.updated_at),
    balance: positionAmount,
    balanceTone,
    positionLabel: position.label || "No expenses yet",
    settlementProgress: Number(group.summary?.settled_percentage || 0) / 100,
    activityCount: `${group.expenses_count || 0} ${
      group.expenses_count === 1 ? "expense" : "expenses"
    }`,
  };
}
