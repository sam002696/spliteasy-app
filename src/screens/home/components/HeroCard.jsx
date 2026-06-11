import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  CircleAlert,
  Phone,
  Plus,
} from "lucide-react-native";
import { Card, Text, useTheme } from "../../../design-system";
import { FadeInView } from "./FadeInView";

function getHeroState(summary) {
  if (summary.netPositionType === "no_activity") {
    return "noActivity";
  }

  if (summary.netPositionType === "you_owe") {
    return "youOwe";
  }

  if (summary.netPositionType === "settled") {
    return "settled";
  }

  return "owedToYou";
}

function getHeroCopy(state, summary) {
  if (state === "noActivity") {
    return {
      action: "Add expense",
      ActionIcon: Plus,
      badge: "Getting started",
      headline: "No balances yet!",
      Icon: CircleAlert,
      subtitle: "Add your first expense to get started",
    };
  }

  if (state === "youOwe") {
    return {
      action: "Settle up",
      ActionIcon: BadgeCheck,
      badge: "You owe",
      headline: summary.netPosition,
      Icon: ArrowUp,
      subtitle: summary.netPositionLabel,
    };
  }

  if (state === "settled") {
    return {
      action: "Add new expense",
      ActionIcon: Plus,
      badge: "All clear",
      headline: "You're all settled!",
      Icon: BadgeCheck,
      subtitle: "No pending balances with anyone",
    };
  }

  return {
    action: "Remind friends",
    ActionIcon: Phone,
    badge: "Owed to you",
    headline: summary.netPosition,
    Icon: ArrowDown,
    subtitle: summary.netPositionLabel,
  };
}

function amountWithSign(value, state) {
  const amount = String(value || "");

  if (state === "youOwe" && !amount.startsWith("-")) {
    return `-${amount}`;
  }

  if (state === "owedToYou" && !amount.startsWith("+")) {
    return `+${amount}`;
  }

  return amount;
}

function HeroBadge({ copy, palette }) {
  const theme = useTheme();
  const Icon = copy.Icon;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: palette.badgeBackground,
          borderRadius: theme.radii.full,
          gap: theme.space[2],
          paddingHorizontal: theme.space[3],
          paddingVertical: theme.space[2],
        },
      ]}
    >
      <Icon
        color={palette.badgeText}
        size={theme.space[4]}
        strokeWidth={theme.borderWidths.medium}
      />
      <Text
        variant="micro"
        color={palette.badgeText}
        numberOfLines={1}
        uppercase
        style={styles.badgeText}
      >
        {copy.badge}
      </Text>
    </View>
  );
}

function HeroStat({ label, value, tone, palette }) {
  const theme = useTheme();
  const amountColor = palette[tone] || palette.amount;

  return (
    <View
      style={[
        styles.stat,
        {
          backgroundColor: palette.statBackground,
          borderColor: palette.statBorder,
          borderRadius: theme.radii.lg,
          borderWidth: theme.borderWidths.thin,
          gap: theme.space[2],
          paddingHorizontal: theme.space[4],
          paddingVertical: theme.space[4],
        },
      ]}
    >
      <Text variant="micro" color={palette.statLabel} uppercase>
        {label}
      </Text>
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.72}
        numberOfLines={1}
        variant="sectionTitle"
        color={amountColor}
      >
        {value}
      </Text>
    </View>
  );
}

function HeroAction({ copy, onPress, palette }) {
  const theme = useTheme();
  const Icon = copy.ActionIcon;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.action,
        {
          backgroundColor: palette.actionBackground,
          borderRadius: theme.radii.full,
          gap: theme.space[3],
          marginTop: theme.space[1],
          minHeight: theme.sizes.minTapTarget + theme.space[4],
          opacity: pressed ? 0.82 : 1,
          paddingHorizontal: theme.space[5],
        },
      ]}
    >
      <Icon
        color={palette.actionText}
        size={theme.space[5]}
        strokeWidth={theme.borderWidths.medium}
      />
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.82}
        variant="cardTitle"
        color={palette.actionText}
        numberOfLines={1}
      >
        {copy.action}
      </Text>
    </Pressable>
  );
}

function DecorativeOrbs({ palette }) {
  return (
    <>
      <View
        pointerEvents="none"
        style={[
          styles.orb,
          styles.orbTop,
          { backgroundColor: palette.orbPrimary },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.orb,
          styles.orbBottom,
          { backgroundColor: palette.orbSecondary },
        ]}
      />
    </>
  );
}

function getHeadlineVariant(state) {
  if (state === "youOwe" || state === "owedToYou") {
    return "heroAmount";
  }

  return "sectionTitle";
}

export function HeroCard({ onAddExpense, onOpenBalances, summary }) {
  const theme = useTheme();
  const state = getHeroState(summary);
  const palette = theme.heroCards[state];
  const copy = getHeroCopy(state, summary);
  const isBalanceAction = state === "youOwe" || state === "owedToYou";
  const primaryAction = isBalanceAction ? onOpenBalances : onAddExpense;
  const headline =
    state === "youOwe" || state === "owedToYou"
      ? amountWithSign(copy.headline, state)
      : copy.headline;

  return (
    <FadeInView delay={theme.motion.normal}>
      <Card
        variant="limeHero"
        padded={false}
        style={{
          backgroundColor: palette.background,
          marginBottom: theme.space[6],
        }}
      >
        <DecorativeOrbs palette={palette} />
        <View
          style={[
            styles.content,
            {
              gap: theme.space[4],
              padding: theme.space[5],
              paddingTop: theme.space[6],
            },
          ]}
        >
          <View style={{ gap: theme.space[3] }}>
            <HeroBadge copy={copy} palette={palette} />
            <View style={{ gap: theme.space[2] }}>
              <Text
                variant={getHeadlineVariant(state)}
                color={palette.title}
                adjustsFontSizeToFit
                minimumFontScale={0.76}
                numberOfLines={2}
              >
                {headline}
              </Text>
              <Text variant="body" color={palette.body} numberOfLines={2}>
                {copy.subtitle}
              </Text>
            </View>
          </View>
          <View style={[styles.statsRow, { gap: theme.space[3] }]}>
            <HeroStat
              label="You owe"
              palette={palette}
              tone="negativeAmount"
              value={summary.youOwe}
            />
            <HeroStat
              label="Owed to you"
              palette={palette}
              tone="positiveAmount"
              value={summary.owedToYou}
            />
          </View>
          <HeroAction copy={copy} onPress={primaryAction} palette={palette} />
        </View>
      </Card>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  action: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  badge: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    maxWidth: "100%",
  },
  badgeText: {
    letterSpacing: 1.8,
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
  orb: {
    borderRadius: 999,
    position: "absolute",
  },
  orbBottom: {
    bottom: -42,
    height: 104,
    left: 48,
    width: 104,
  },
  orbTop: {
    height: 128,
    right: -28,
    top: -18,
    width: 128,
  },
  statsRow: {
    flexDirection: "row",
  },
  stat: {
    flex: 1,
  },
});
