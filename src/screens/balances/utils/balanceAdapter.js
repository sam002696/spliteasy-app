const currencySymbols = {
  BDT: "৳",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

function formatAmount(amount, currency = "BDT") {
  const value = Number(amount || 0);
  const symbol = currencySymbols[currency] || currency;

  return `${symbol} ${value.toLocaleString("en-US", {
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  })}`;
}

function getBalanceTone(type) {
  return type === "you_owe" ? "negative" : "positive";
}

function getActionLabel(action, tone) {
  if (action === "remind") {
    return "Remind";
  }

  if (action === "settle" || tone === "negative") {
    return "Mark settled";
  }

  return "View details";
}

const categoryToneByName = {
  Roommates: "lime",
  Family: "lime",
  Friends: "orange",
  Movie: "orange",
  Team: "lime",
  Travel: "orange",
};

export function mapApiBalanceToListItem(balance) {
  const tone = getBalanceTone(balance.type);
  const latestExpense = balance.latest_expense;

  return {
    id: String(balance.id),
    groupId: balance.group?.id,
    userId: balance.user?.id,
    person: balance.user?.name || balance.user?.email || "Member",
    group: balance.group?.name || "Group",
    category: balance.group?.category || "Group",
    categoryTone: categoryToneByName[balance.group?.category] || "lime",
    note: balance.label || "",
    amount: formatAmount(
      balance.amount,
      balance.currency || balance.group?.base_currency,
    ),
    tone,
    progress: Number(balance.settled_percentage || 0) / 100,
    action: getActionLabel(balance.action, tone),
    canRemind:
      tone === "positive" && Boolean(balance.group?.id && balance.user?.id),
    canSettle:
      tone === "negative" && Boolean(balance.group?.id && balance.user?.id),
    lastActivityDetail: latestExpense
      ? `${latestExpense.description || "Recent expense"} · ${formatAmount(
          latestExpense.amount,
          latestExpense.currency || balance.group?.base_currency,
        )}`
      : "No recent expense",
  };
}
