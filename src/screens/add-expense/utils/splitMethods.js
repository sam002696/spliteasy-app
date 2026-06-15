export function parseSplitNumber(value) {
  const parsed = Number(String(value || "").replace(/,/g, "").trim());

  return Number.isFinite(parsed) ? parsed : 0;
}

function toCents(value) {
  return Math.round(parseSplitNumber(value) * 100);
}

function formatSplitValue(value) {
  const rounded = Math.round(Number(value || 0) * 100) / 100;

  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

function distributeAmount(amountValue, members) {
  if (!members.length || amountValue <= 0) {
    return {};
  }

  const totalCents = Math.round(amountValue * 100);
  const baseCents = Math.floor(totalCents / members.length);
  const extraCents = totalCents - baseCents * members.length;

  return members.reduce((values, member, index) => {
    const cents = baseCents + (index < extraCents ? 1 : 0);
    values[String(member.id)] = formatSplitValue(cents / 100);

    return values;
  }, {});
}

function distributePercent(members) {
  if (!members.length) {
    return {};
  }

  const base = Math.floor(10000 / members.length) / 100;
  const baseTotal = Math.round(base * 100) * members.length;
  const remainder = 10000 - baseTotal;

  return members.reduce((values, member, index) => {
    const value = base + (index === members.length - 1 ? remainder / 100 : 0);
    values[String(member.id)] = formatSplitValue(value);

    return values;
  }, {});
}

export function buildDefaultSplitValues(splitMethod, members, amountValue) {
  if (splitMethod === "custom") {
    return distributeAmount(amountValue, members);
  }

  if (splitMethod === "percent") {
    return distributePercent(members);
  }

  if (splitMethod === "shares") {
    return members.reduce((values, member) => {
      values[String(member.id)] = "1";

      return values;
    }, {});
  }

  return {};
}

export function buildSplitRows(splitMethod, members, splitValues) {
  if (splitMethod === "equal") {
    return undefined;
  }

  return members.map((member) => {
    const userId = Number(member.id);
    const value = parseSplitNumber(splitValues[String(member.id)]);

    if (splitMethod === "custom") {
      return {
        amount: value,
        user_id: userId,
      };
    }

    return {
      user_id: userId,
      value,
    };
  });
}

export function isSplitValid({
  amountValue,
  members,
  splitMethod,
  splitValues,
}) {
  if (!members.length) {
    return false;
  }

  if (splitMethod === "equal") {
    return true;
  }

  const values = members.map((member) =>
    parseSplitNumber(splitValues[String(member.id)]),
  );
  const hasOnlyPositiveValues = values.every((value) => value > 0);

  if (!hasOnlyPositiveValues) {
    return false;
  }

  const total = values.reduce((sum, value) => sum + value, 0);

  if (splitMethod === "custom") {
    return toCents(total) === toCents(amountValue);
  }

  if (splitMethod === "percent") {
    return Math.abs(total - 100) <= 0.01;
  }

  return total > 0;
}
