import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Divider, Text, useTheme } from "../../../design-system";

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
  const balanceTone = summary.yourBalance.startsWith("-") ? "danger" : "accentText";

  return (
    <Card variant="limeHero" style={{ marginBottom: theme.space[5] }}>
      <Text variant="micro" color="black60" uppercase>
        Your group balance
      </Text>
      <Text variant="heroAmount" color={balanceTone} style={{ marginTop: theme.space[1] }}>
        {summary.yourBalance}
      </Text>
      <View style={[styles.row, { marginTop: theme.space[5] }]}>
        <SummaryStat label="Total spend" value={summary.totalSpend} />
        <Divider vertical color="black20" style={{ alignSelf: "stretch" }} />
        <SummaryStat label="Unsettled" value={summary.unsettled} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  stat: {
    flex: 1,
  },
});
