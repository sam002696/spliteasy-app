import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  BadgeCheck,
  CreditCard,
  Mail,
  UserRoundPlus,
} from "lucide-react-native";
import { Text, useTheme } from "../../../design-system";
import { FadeInView } from "./FadeInView";

const quickActions = [
  {
    id: "addExpense",
    title: "Add expense",
    subtitle: "Split a bill instantly",
    Icon: CreditCard,
  },
  {
    id: "createGroup",
    title: "Create group",
    subtitle: "Trip, home, friends",
    Icon: UserRoundPlus,
  },
  {
    id: "inviteMember",
    title: "Invite member",
    subtitle: "Add via link or email",
    Icon: Mail,
  },
  {
    id: "settleUp",
    title: "Settle up",
    subtitle: "Clear your debts",
    Icon: BadgeCheck,
  },
];

function QuickActionCard({ action, onPress }) {
  const theme = useTheme();
  const palette = theme.quickActions[action.id];
  const Icon = action.Icon;

  return (
    <Pressable
      accessibilityLabel={action.title}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: palette.background,
          borderRadius: theme.radii.lg,
          minHeight: theme.sizes.minTapTarget * 3,
          opacity: pressed ? 0.82 : 1,
          padding: theme.space[4],
        },
      ]}
    >
      <Icon
        color={palette.icon}
        size={theme.space[6]}
        strokeWidth={theme.borderWidths.medium}
      />
      <View style={{ gap: theme.space[1] }}>
        <Text
          adjustsFontSizeToFit
          minimumFontScale={0.82}
          numberOfLines={1}
          variant="cardTitle"
          color={palette.title}
        >
          {action.title}
        </Text>
        <Text
          adjustsFontSizeToFit
          minimumFontScale={0.82}
          numberOfLines={1}
          variant="body"
          color={palette.subtitle}
        >
          {action.subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

export function QuickActionsSection({ onActionPress }) {
  const theme = useTheme();

  return (
    <FadeInView delay={theme.motion.normal + theme.motion.fast}>
      <View style={{ marginBottom: theme.space[6] }}>
        <Text
          variant="screenTitle"
          color="text"
          style={{ marginBottom: theme.space[4] }}
        >
          Quick actions
        </Text>
        <View style={[styles.grid, { gap: theme.space[3] }]}>
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.id}
              action={action}
              onPress={() => onActionPress?.(action.id)}
            />
          ))}
        </View>
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: "47%",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
