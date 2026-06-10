import React from "react";
import { StyleSheet, View } from "react-native";
import { CheckCircle, Clock3, Plus } from "lucide-react-native";
import { Button, Card, Text, useTheme } from "../../../design-system";
import { FadeInView } from "./FadeInView";

const TAKA_SYMBOL = "৳";

function getNetPositionConfig(summary) {
  if (summary.netPositionType === "no_activity") {
    return {
      backgroundColor: "#FFD166",
      isNoActivity: true,
    };
  }

  if (summary.netPositionType === "you_owe") {
    return {
      amountTone: "negative",
      backgroundColor: "#FFD166",
      icon: Clock3,
      pillBackground: "white50",
      pillTone: "negative",
    };
  }

  if (summary.netPositionType === "settled") {
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

function AmountText({
  value,
  variant = "sectionTitle",
  tone = "accentText",
  large = false,
}) {
  const theme = useTheme();
  const amount = String(value).replace(/BDT|৳/gi, "").trim();

  return (
    <View style={[styles.amountRow, { gap: large ? 0 : theme.space[1] }]}>
      <Text
        variant={variant}
        color={tone}
        style={{
          fontFamily: theme.fontFamilies.display,
          lineHeight: large
            ? theme.typography.heroAmount.lineHeight
            : undefined,
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

function NoActivityState({ onAddExpense }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.noActivity,
        {
          gap: theme.space[2],
          paddingVertical: theme.space[5],
        },
      ]}
    >
      <Text variant="cardTitle" color="accentText" align="center">
        No balances yet!
      </Text>
      <Text variant="body" color="black60" align="center">
        Add your first expense to get started
      </Text>
      <Button
        title="Add expense"
        onPress={onAddExpense}
        left={
          <Plus
            color={theme.colors.white}
            size={theme.space[5]}
            strokeWidth={theme.borderWidths.medium}
          />
        }
        style={{
          marginTop: theme.space[2],
          backgroundColor: theme.semantic.secondaryAccent,
          borderColor: theme.semantic.secondaryAccent,
          paddingHorizontal: theme.space[5],
        }}
        textStyle={{ color: theme.colors.white }}
      />
    </View>
  );
}

function NetPositionState({ config, summary }) {
  const theme = useTheme();
  const StatusIcon = config.icon;

  return (
    <>
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
            tone={config.amountTone}
            large
          />
        </View>
      </View>
      <View
        style={[
          styles.statusPill,
          {
            backgroundColor: theme.rgba[config.pillBackground],
            borderRadius: theme.radii.full,
            gap: theme.space[2],
            marginTop: theme.space[3],
            paddingHorizontal: theme.space[3],
            paddingVertical: theme.space[1],
          },
        ]}
      >
        <StatusIcon
          color={theme.semantic[config.pillTone]}
          size={theme.space[4]}
          strokeWidth={theme.borderWidths.medium}
        />
        <Text variant="micro" color={config.pillTone} numberOfLines={1}>
          {summary.netPositionLabel}
        </Text>
      </View>
      <View style={[styles.statsRow, { marginTop: theme.space[5] }]}>
        <HeroStat label="Owed to you" value={summary.owedToYou} />
        <HeroStat label="You owe" value={summary.youOwe} tone="negative" />
      </View>
    </>
  );
}

export function HeroCard({ onAddExpense, summary }) {
  const theme = useTheme();
  const netPositionConfig = getNetPositionConfig(summary);

  return (
    <FadeInView delay={theme.motion.normal}>
      <Card
        variant="limeHero"
        style={{
          backgroundColor: netPositionConfig.backgroundColor,
          marginBottom: theme.space[6],
        }}
      >
        {netPositionConfig.isNoActivity ? (
          <NoActivityState onAddExpense={onAddExpense} />
        ) : (
          <NetPositionState config={netPositionConfig} summary={summary} />
        )}
      </Card>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  amountRow: {
    alignItems: "baseline",
    flexDirection: "row",
  },
  noActivity: {
    alignItems: "center",
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
