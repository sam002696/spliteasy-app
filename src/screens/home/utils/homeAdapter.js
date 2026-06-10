const currencySymbols = {
  BDT: "৳",
  EUR: "€",
  GBP: "£",
  USD: "$",
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

  return `${symbol}${value.toLocaleString("en-US", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  })}`;
}

function formatRelativeDate(value) {
  if (!value) {
    return "Recently";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours} hr ago`;
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

  return "positive";
}

function getMembers(group) {
  return (group.members_preview?.members || []).map(
    (member) => member.name || member.email || member.initials
  );
}

function getLatestExpenseLabel(group) {
  const latestExpense = group.latest_expense;

  if (!latestExpense) {
    return "No expenses yet";
  }

  return latestExpense.description || "Recent expense";
}

function getActivityAction(type) {
  if (type === "settlement_created") {
    return "settled";
  }

  if (type === "expense_added") {
    return "added";
  }

  return "updated";
}

export function mapHomeSummary(summary) {
  const currency = summary?.currency || "BDT";
  const netPositionAmount = Number(summary?.net_position?.amount || 0);

  return {
    netPosition: formatAmount(netPositionAmount, currency),
    netPositionType: summary?.net_position?.type || "settled",
    netPositionLabel: summary?.net_position?.label || "Split status",
    owedToYou: formatAmount(summary?.owed_to_you, currency),
    youOwe: formatAmount(summary?.you_owe, currency),
  };
}

export function mapHomeGroup(group) {
  const position = group.summary?.current_user_position || {};

  return {
    id: String(group.id),
    name: group.name,
    memberCount: group.members_count || 0,
    latestExpense: getLatestExpenseLabel(group),
    balance: formatAmount(position.amount, group.base_currency),
    balanceTone: getPositionTone(position.type),
    category: group.category,
    categoryTone: categoryToneByName[group.category] || "lime",
    members: getMembers(group),
    settlementProgress: Number(group.summary?.settled_percentage || 0) / 100,
  };
}

export function mapHomeActivity(activity) {
  const hasAmount =
    activity.amount !== null &&
    activity.amount !== undefined &&
    activity.currency;

  return {
    id: String(activity.id),
    user: activity.actor?.name || activity.actor?.initials || "Someone",
    action: getActivityAction(activity.type),
    title: activity.title,
    headline: activity.title,
    amount: hasAmount ? formatAmount(activity.amount, activity.currency) : null,
    label: hasAmount ? activity.position_label : null,
    tone: getPositionTone(activity.position_type),
    timestamp: formatRelativeDate(activity.created_at),
  };
}
