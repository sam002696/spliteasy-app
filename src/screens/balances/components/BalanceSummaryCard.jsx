import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Divider, Text, useTheme } from "../../../design-system";
import { AnimatedSection } from "./AnimatedSection";

function SummaryStat({ label, value, tone = "accentText" }) {
  const theme = useTheme();

  return (
    <View style={[styles.stat, { gap: theme.space[1] }]}>
      <Text variant="sectionTitle" color={tone}>
        {value}
      </Text>
      <Text variant="micro" color="black60">
        {label}
      </Text>
    </View>
  );
}

export function BalanceSummaryCard({ summary }) {
  const theme = useTheme();

  return (
    <AnimatedSection delay={theme.motion.fast}>
      <Card variant="limeHero" style={{ marginBottom: theme.space[5] }}>
        <Text variant="micro" color="black60" uppercase>
          Net position
        </Text>
        <Text variant="heroAmount" color="accentText" style={{ marginTop: theme.space[1] }}>
          {summary.netPosition}
        </Text>
        <View style={[styles.row, { marginTop: theme.space[5] }]}>
          <SummaryStat label="Owed to you" value={summary.owedToYou} />
          <Divider vertical color="black20" style={{ alignSelf: "stretch" }} />
          <SummaryStat label="You owe" value={summary.youOwe} tone="danger" />
        </View>
      </Card>
    </AnimatedSection>
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
