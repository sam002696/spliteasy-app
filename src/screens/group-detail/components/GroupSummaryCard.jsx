import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Divider, Text, useTheme } from "../../../design-system";

const TAKA_SYMBOL = "৳";

function PositionAmount({ value, tone }) {
  const theme = useTheme();
  const amount = String(value).replace(/BDT|৳/gi, "").trim();

  return (
    <View
      style={[
        styles.amountRow,
        { gap: theme.space[1], marginTop: theme.space[1] },
      ]}
    >
      <Text variant="cardAmount" color={tone}>
        {TAKA_SYMBOL}
        {amount}
      </Text>
    </View>
  );
}

function SummaryStat({ label, value }) {
  const theme = useTheme();
  const palette = theme.groupDetailScreen;

  return (
    <View
      style={[
        styles.stat,
        {
          backgroundColor: theme.semantic.background,
          borderRadius: theme.radii.lg,
          gap: theme.space[1],
          padding: theme.space[3],
        },
      ]}
    >
      <Text variant="cardTitle" color="text" numberOfLines={1}>
        {value}
      </Text>
      <Text variant="micro" color={palette.metaText} uppercase>
        {label}
      </Text>
    </View>
  );
}

export function GroupSummaryCard({ summary }) {
  const theme = useTheme();
  const palette = theme.groupDetailScreen;
  const balanceTone =
    summary.yourPositionTone === "negative" ? "danger" : "positive";

  return (
    <Card
      variant="plain"
      style={{
        backgroundColor: palette.cardBackground,
        borderRadius: theme.radii.xl,
        marginBottom: theme.space[5],
      }}
    >
      <Text variant="field" color={palette.metaText} uppercase>
        Your position
      </Text>
      <PositionAmount value={summary.yourPositionAmount} tone={balanceTone} />
      <Text
        variant="label"
        color={palette.metaText}
        style={{ marginTop: theme.space[1] }}
      >
        {summary.yourPositionLabel}
      </Text>
      <Divider
        color={palette.cardDivider}
        style={{ marginVertical: theme.space[5] }}
      />
      <View style={[styles.row, { gap: theme.space[3] }]}>
        <SummaryStat label="Total group spend" value={summary.totalSpend} />
        <SummaryStat label="Unsettled" value={summary.unsettled} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  amountRow: {
    alignItems: "baseline",
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },
  stat: {
    flex: 1,
  },
});
