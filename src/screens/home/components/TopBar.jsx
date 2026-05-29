import React from "react";
import { BellDot } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Avatar, Text, useTheme } from "../../../design-system";
import { selectCurrentUser, useAppSelector } from "../../../store";
import { getGreeting } from "../utils";
import { FadeInView } from "./FadeInView";

function NotificationButton() {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityLabel="Notifications"
      accessibilityRole="button"
      hitSlop={theme.space[2]}
      style={({ pressed }) => [
        styles.notification,
        {
          backgroundColor: theme.semantic.surfaceStrong,
          borderRadius: theme.radii.full,
          height: theme.sizes.iconButton,
          opacity: pressed ? 0.78 : 1,
          width: theme.sizes.iconButton,
        },
      ]}
    >
      <BellDot
        color={theme.semantic.accent}
        size={theme.space[5]}
        strokeWidth={theme.borderWidths.medium}
      />
    </Pressable>
  );
}

export function TopBar() {
  const theme = useTheme();
  const currentUser = useAppSelector(selectCurrentUser);
  const displayName = currentUser?.name || currentUser?.email || "there";
  const greeting = getGreeting();

  return (
    <FadeInView delay={0}>
      <View style={[styles.root, { marginBottom: theme.space[4] }]}>
        <View style={[styles.identity, { gap: theme.space[3] }]}>
          <Avatar name={displayName} />
          <View>
            <Text variant="label" color="textMuted">
              {greeting},
            </Text>
            <Text variant="cardTitle" color="text">
              {displayName}
            </Text>
          </View>
        </View>
        <NotificationButton />
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  identity: {
    alignItems: "center",
    flexDirection: "row",
  },
  notification: {
    alignItems: "center",
    justifyContent: "center",
  },
});
