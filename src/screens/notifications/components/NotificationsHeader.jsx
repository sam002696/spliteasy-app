import React from "react";
import { ArrowLeft, CheckCheck } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

function HeaderButton({ icon: Icon, label, onPress, disabled = false }) {
  const theme = useTheme();
  const palette = theme.notificationsScreen;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      disabled={disabled}
      hitSlop={theme.space[2]}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: palette.headerButtonBackground,
          borderRadius: theme.radii.full,
          height: theme.sizes.iconButton,
          opacity: disabled ? 0.45 : pressed ? 0.78 : 1,
          width: theme.sizes.iconButton,
        },
      ]}
    >
      <Icon
        color={palette.headerButtonIcon}
        size={theme.space[5]}
        strokeWidth={theme.borderWidths.medium}
      />
    </Pressable>
  );
}

export function NotificationsHeader({
  markAllDisabled = false,
  onBack,
  onMarkAllRead,
  unreadCount = 0,
}) {
  const theme = useTheme();

  return (
    <View style={[styles.root, { marginBottom: theme.space[5] }]}>
      <HeaderButton icon={ArrowLeft} label="Go back" onPress={onBack} />
      <View style={{ flex: 1, gap: theme.space[1] }}>
        <Text variant="label" color="textMuted" uppercase>
          {unreadCount} unread
        </Text>
        <Text variant="screenTitle" color="text">
          Notifications
        </Text>
      </View>
      <HeaderButton
        disabled={markAllDisabled || unreadCount === 0}
        icon={CheckCheck}
        label="Mark all notifications as read"
        onPress={onMarkAllRead}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
});
