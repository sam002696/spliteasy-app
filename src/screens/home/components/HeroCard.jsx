import React from "react";
import { StyleSheet, View } from "react-native";
import { CheckCircle } from "lucide-react-native";
import { Card, Text, useTheme } from "../../../design-system";
import { FadeInView } from "./FadeInView";

const TAKA_SYMBOL = "৳";

function AmountText({ value, variant = "sectionTitle", tone = "accentText", large = false }) {
  const theme = useTheme();
  const amount = String(value).replace(/BDT|৳/gi, "").trim();

  return (
    <View style={[styles.amountRow, { gap: large ? 0 : theme.space[1] }]}>
      <Text
        variant={variant}
        color={tone}
        style={{
          fontFamily: theme.fontFamilies.display,
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
        <View>
          <Text
            variant="micro"
            color="black60"
            uppercase
            style={styles.trackedLabel}
          >
            Net position
          </Text>
          <View style={{ marginTop: theme.space[2] }}>
              <AmountText value={summary.netPosition} variant="heroAmount" large />
          </View>
        </View>
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: theme.rgba.black08,
              borderRadius: theme.radii.full,
              gap: theme.space[2],
              marginTop: theme.space[3],
              paddingHorizontal: theme.space[3],
              paddingVertical: theme.space[1],
            },
          ]}
        >
          <CheckCircle
            color={theme.semantic.accentText}
            size={theme.space[4]}
            strokeWidth={theme.borderWidths.medium}
          />
          <Text variant="micro" color="accentText" numberOfLines={1}>
            {summary.netPositionLabel}
          </Text>
        </View>
        <View style={[styles.statsRow, { marginTop: theme.space[5] }]}>
          <HeroStat label="Owed to you" value={summary.owedToYou} />
          <HeroStat label="You owe" value={summary.youOwe} tone="negative" />
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
  statusPill: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    maxWidth: "100%",
  },
  statsRow: {
    flexDirection: "row",
  },
  stat: {
    flex: 1,
  },
  trackedLabel: {
    letterSpacing: 4,
  },
});
