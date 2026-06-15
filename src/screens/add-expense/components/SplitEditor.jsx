import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text, TextField, useTheme } from "../../../design-system";

const currencySymbols = {
  BDT: "৳",
  EUR: "€",
  GBP: "£",
  USD: "$",
};

function parseNumber(value) {
  const parsed = Number(String(value || "").replace(/,/g, "").trim());

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatAmount(value, currency) {
  const symbol = currencySymbols[currency] || currency;

  return `${symbol} ${Number(value || 0).toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`;
}

function valueLabel(splitMethod, currency) {
  if (splitMethod === "custom") {
    return currencySymbols[currency] || currency;
  }

  if (splitMethod === "percent") {
    return "%";
  }

  return "x";
}

function summaryCopy({ amountValue, currency, splitMethod, totalValue }) {
  if (splitMethod === "custom") {
    if (amountValue <= 0) {
      return {
        color: "danger",
        text: "Enter an amount before setting custom splits.",
      };
    }

    const remaining = amountValue - totalValue;

    if (Math.abs(remaining) < 0.005) {
      return {
        color: "positive",
        text: "Custom amounts match the expense total.",
      };
    }

    return {
      color: "danger",
      text:
        remaining > 0
          ? `${formatAmount(remaining, currency)} left to allocate.`
          : `${formatAmount(Math.abs(remaining), currency)} over the expense total.`,
    };
  }

  if (splitMethod === "percent") {
    if (Math.abs(totalValue - 100) <= 0.01) {
      return {
        color: "positive",
        text: "Percent split adds up to 100%.",
      };
    }

    return {
      color: "danger",
      text: `${totalValue.toFixed(2)}% allocated. Total must be 100%.`,
    };
  }

  return {
    color: totalValue > 0 ? "positive" : "danger",
    text:
      totalValue > 0
        ? `${totalValue.toFixed(2)} total shares.`
        : "Add at least one share.",
  };
}

export function SplitEditor({
  amountValue,
  currency,
  members,
  onChangeValue,
  splitMethod,
  values,
}) {
  const theme = useTheme();
  const palette = theme.addExpenseScreen;
  const totalValue = members.reduce(
    (total, member) => total + parseNumber(values[String(member.id)]),
    0,
  );
  const summary = summaryCopy({
    amountValue,
    currency,
    splitMethod,
    totalValue,
  });

  if (splitMethod === "equal") {
    const memberCount = members.length;
    const eachAmount = memberCount > 0 ? amountValue / memberCount : 0;

    return (
      <View
        style={{
          backgroundColor: palette.cardBackground,
          borderRadius: theme.radii.lg,
          gap: theme.space[1],
          padding: theme.space[4],
        }}
      >
        <Text variant="cardTitle" color="text">
          {memberCount} people
        </Text>
        <Text variant="body" color="textMuted">
          Each person pays {formatAmount(eachAmount, currency)}.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ gap: theme.space[3] }}>
      {members.map((member) => {
        const memberId = String(member.id);

        return (
          <View
            key={memberId}
            style={[
              styles.splitRow,
              {
                backgroundColor: palette.cardBackground,
                borderRadius: theme.radii.lg,
                gap: theme.space[3],
                padding: theme.space[3],
              },
            ]}
          >
            <Avatar
              name={member.name}
              textColor={palette.selectedText}
              style={{ backgroundColor: palette.selectedBackground }}
              textStyle={theme.typography.field}
            />
            <View style={{ flex: 1, gap: theme.space[1] }}>
              <Text variant="field" color="text" numberOfLines={1}>
                {member.name}
              </Text>
              <Text variant="label" color="textMuted" numberOfLines={1}>
                {member.email}
              </Text>
            </View>
            <View style={styles.valueField}>
              <TextField
                value={values[memberId] || ""}
                onChangeText={(value) => onChangeValue(memberId, value)}
                keyboardType="decimal-pad"
                placeholder="0"
                inputStyle={styles.splitInput}
                right={
                  <Text variant="micro" color="textMuted">
                    {valueLabel(splitMethod, currency)}
                  </Text>
                }
                style={{
                  backgroundColor: palette.fieldBackground,
                  borderColor: palette.fieldBorder,
                }}
              />
            </View>
          </View>
        );
      })}

      <View
        style={[
          styles.summary,
          {
            backgroundColor: palette.cardBackground,
            borderRadius: theme.radii.lg,
            padding: theme.space[3],
          },
        ]}
      >
        <Text variant="field" color={summary.color}>
          {summary.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splitRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  splitInput: {
    textAlign: "right",
  },
  summary: {
    alignItems: "center",
  },
  valueField: {
    width: 116,
  },
});
