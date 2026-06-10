import React from "react";
import { StyleSheet, View } from "react-native";
import { CheckCircle, Clock3 } from "lucide-react-native";
import { Card, Text, useTheme } from "../../../design-system";
import { FadeInView } from "./FadeInView";

const TAKA_SYMBOL = "৳";

function getNetPositionConfig(summary) {
  const netPosition = Number(summary.rawNetPosition || 0);
  const owedToYou = Number(summary.rawOwedToYou || 0);
  const youOwe = Number(summary.rawYouOwe || 0);

  if (youOwe > owedToYou || netPosition < 0) {
    return {
      amountTone: "negative",
      backgroundColor: "#FFD166",
      icon: Clock3,
      pillBackground: "white50",
      pillTone: "negative",
    };
  }

  if (owedToYou === 0 && youOwe === 0) {
    return {
      amountTone: "accentText",
      backgroundColor: "#DFF2FF",
      icon: CheckCircle,
      pillBackground: "white60",
      pillTone: "accentText",
    };
  }

  return {
    amountTone: "accentText",
    backgroundColor: "#18D9A8",
    icon: CheckCircle,
    pillBackground: "white60",
    pillTone: "accentText",
  };
}

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
  const netPositionConfig = getNetPositionConfig(summary);
  const StatusIcon = netPositionConfig.icon;

  return (
    <FadeInView delay={theme.motion.normal}>
      <Card
        variant="limeHero"
        style={{
          backgroundColor: netPositionConfig.backgroundColor,
          marginBottom: theme.space[6],
        }}
      >
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
            <AmountText
              value={summary.netPosition}
              variant="heroAmount"
              tone={netPositionConfig.amountTone}
              large
            />
          </View>
        </View>
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: theme.rgba[netPositionConfig.pillBackground],
              borderRadius: theme.radii.full,
              gap: theme.space[2],
              marginTop: theme.space[3],
              paddingHorizontal: theme.space[3],
              paddingVertical: theme.space[1],
            },
          ]}
        >
          <StatusIcon
            color={theme.semantic[netPositionConfig.pillTone]}
            size={theme.space[4]}
            strokeWidth={theme.borderWidths.medium}
          />
          <Text
            variant="micro"
            color={netPositionConfig.pillTone}
            numberOfLines={1}
          >
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
