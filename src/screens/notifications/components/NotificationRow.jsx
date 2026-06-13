import React from "react";
import { Check, Circle } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Avatar, Text, useTheme } from "../../../design-system";

export function NotificationRow({ notification, onPress, reading = false }) {
  const theme = useTheme();
  const palette = theme.notificationsScreen;
  const unread = !notification.isRead;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={reading || notification.isRead}
      onPress={() => onPress?.(notification.id)}
      style={({ pressed }) => [
        styles.root,
        {
          backgroundColor: unread
            ? palette.unreadBackground
            : palette.cardBackground,
          borderRadius: theme.radii.xl,
          gap: theme.space[3],
          opacity: reading ? 0.58 : pressed ? 0.82 : 1,
          padding: theme.space[4],
        },
      ]}
    >
      <Avatar
        name={notification.actorName}
        textColor={palette.avatarText}
        style={{ backgroundColor: palette.avatarBackground }}
        textStyle={theme.typography.field}
      />
      <View style={{ flex: 1, gap: theme.space[1] }}>
        <Text variant="field" color="text" numberOfLines={2}>
          {notification.title}
        </Text>
        <Text variant="label" color={palette.metaText} numberOfLines={1}>
          {notification.subtitle || notification.createdAt}
        </Text>
        {notification.subtitle ? (
          <Text variant="micro" color={palette.metaText}>
            {notification.createdAt}
          </Text>
        ) : null}
      </View>
      <View style={styles.status}>
        {unread ? (
          <Circle
            color={palette.unreadDot}
            fill={palette.unreadDot}
            size={theme.space[3]}
          />
        ) : (
          <Check
            color={palette.readIcon}
            size={theme.space[5]}
            strokeWidth={theme.borderWidths.medium}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "row",
  },
  status: {
    alignItems: "flex-end",
  },
});
