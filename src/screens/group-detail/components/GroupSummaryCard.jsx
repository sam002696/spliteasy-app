import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Divider, Text, useTheme } from "../../../design-system";

const TAKA_SYMBOL = "৳";

function PositionAmount({ value, tone }) {
  const theme = useTheme();
  const amount = String(value).replace(/BDT|৳/gi, "").trim();
  const lineHeight = theme.typography.heroAmount.lineHeight + theme.space[2];

  return (
    <View style={[styles.amountRow, { gap: theme.space[2], marginTop: theme.space[1] }]}>
      <Text
        variant="heroAmount"
        color={tone}
        style={{
          fontFamily: theme.fontFamilies.bodyFallback,
          lineHeight,
        }}
      >
        {TAKA_SYMBOL}
      </Text>
      <Text
        variant="heroAmount"
        color={tone}
        style={{
          lineHeight,
        }}
      >
        {amount}
      </Text>
    </View>
  );
}

function SummaryStat({ label, value, tone = "accentText" }) {
  const theme = useTheme();

  return (
    <View style={[styles.stat, { gap: theme.space[1] }]}>
      <Text variant="sectionTitle" color={tone} numberOfLines={1}>
        {value}
      </Text>
      <Text variant="micro" color="black60">
        {label}
      </Text>
    </View>
  );
}

export function GroupSummaryCard({ summary }) {
  const theme = useTheme();
  const balanceTone =
    summary.yourPositionTone === "negative" ? "danger" : "accentText";

  return (
    <Card variant="limeHero" style={{ marginBottom: theme.space[5] }}>
      <Text variant="micro" color="black60" uppercase>
        Your position
      </Text>
      <PositionAmount value={summary.yourPositionAmount} tone={balanceTone} />
      <Text
        variant="label"
        color="black60"
        style={{ marginTop: theme.space[1] }}
      >
        {summary.yourPositionLabel}
      </Text>
      <View style={[styles.row, { marginTop: theme.space[5] }]}>
        <SummaryStat label="Total group spend" value={summary.totalSpend} />
        <Divider vertical color="black20" style={{ alignSelf: "stretch" }} />
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
