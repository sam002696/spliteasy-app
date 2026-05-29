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

export function mapApiBalanceToListItem(balance) {
  const tone = getBalanceTone(balance.type);
  const latestExpense = balance.latest_expense;

  return {
    id: String(balance.id),
    person: balance.user?.name || balance.user?.email || "Member",
    group: balance.group?.name || "Group",
    note: balance.label || "",
    amount: formatAmount(
      balance.amount,
      balance.currency || balance.group?.base_currency
    ),
    tone,
    progress: Number(balance.settled_percentage || 0) / 100,
    action: getActionLabel(balance.action, tone),
    lastActivity: latestExpense?.description || "No recent expense",
  };
}
