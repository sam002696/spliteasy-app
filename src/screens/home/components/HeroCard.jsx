import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Divider, Text, useTheme } from "../../../design-system";
import { FadeInView } from "./FadeInView";

const TAKA_SYMBOL = "৳";

function AmountText({ value, variant = "sectionTitle", tone = "accentText", large = false }) {
  const theme = useTheme();
  const amount = String(value).replace(/BDT|৳/gi, "").trim();

  return (
    <View style={[styles.amountRow, { gap: theme.space[2] }]}>
      <Text
        variant={variant}
        color={tone}
        style={{
          fontFamily: theme.fontFamilies.bodyFallback,
          lineHeight: large ? theme.typography.heroAmount.lineHeight : undefined,
        }}
      >
        {TAKA_SYMBOL}
      </Text>
      <Text variant={variant} color={tone}>
        {amount}
      </Text>
    </View>
  );
}

function HeroStat({ label, value, tone = "accentText" }) {
  const theme = useTheme();

  return (
    <View style={[styles.stat, { gap: theme.space[1] }]}>
      <AmountText value={value} tone={tone} />
      <Text variant="micro" color="black60">
        {label}
      </Text>
    </View>
  );
}

export function HeroCard({ summary }) {
  const theme = useTheme();

  return (
    <FadeInView delay={theme.motion.normal}>
      <Card variant="limeHero" style={{ marginBottom: theme.space[6] }}>
        <Text variant="micro" color="black60" uppercase>
          Total balance
        </Text>
        <View style={{ marginTop: theme.space[1] }}>
          <AmountText value={summary.totalBalance} variant="heroAmount" large />
        </View>
        <View style={[styles.statsRow, { marginTop: theme.space[5] }]}>
          <HeroStat label="Owed to you" value={summary.owedToYou} />
          <Divider vertical color="black20" style={{ alignSelf: "stretch" }} />
          <HeroStat label="You owe" value={summary.youOwe} tone="danger" />
        </View>
      </Card>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  amountRow: {
    alignItems: "baseline",
    flexDirection: "row",
  },
  statsRow: {
    flexDirection: "row",
  },
  stat: {
    flex: 1,
  },
});
