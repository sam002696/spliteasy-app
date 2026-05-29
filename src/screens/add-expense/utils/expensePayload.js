function parseAmount(value) {
  const normalized = String(value || "").replace(/,/g, "").trim();
  const amount = Number(normalized);

  return Number.isFinite(amount) ? amount : 0;
}

export function getTodayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

export function buildCreateExpensePayload({
  amount,
  currency,
  description,
  expenseDate,
  paidByUserId,
  participantUserIds,
  splitMethod,
}) {
  return {
    description: description.trim(),
    amount: parseAmount(amount),
    currency,
    expense_date: expenseDate,
    paid_by_user_id: Number(paidByUserId),
    split_method: splitMethod,
    participant_user_ids: participantUserIds.map(Number),
  };
}
