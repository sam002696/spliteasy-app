import React from "react";
import { Check, Circle } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Avatar, Text, useTheme } from "../../../design-system";

export function NotificationRow({ notification, onPress, reading = false }) {
  const theme = useTheme();
  const unread = !notification.isRead;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={reading || notification.isRead}
      onPress={() => onPress?.(notification.id)}
      style={({ pressed }) => [
        styles.root,
        {
          backgroundColor: unread ? theme.semantic.surfaceStrong : theme.semantic.surface,
          borderRadius: theme.radii.lg,
          gap: theme.space[3],
          opacity: reading ? 0.58 : pressed ? 0.82 : 1,
          padding: theme.space[4],
        },
      ]}
    >
      <Avatar name={notification.actorName} />
      <View style={{ flex: 1, gap: theme.space[1] }}>
        <Text variant="bodySmall" color={unread ? "white" : "text"} numberOfLines={2}>
          {notification.title}
        </Text>
        <Text variant="label" color={unread ? "white50" : "textMuted"} numberOfLines={1}>
          {notification.subtitle || notification.createdAt}
        </Text>
        {notification.subtitle ? (
          <Text variant="micro" color={unread ? "white50" : "textMuted"}>
            {notification.createdAt}
          </Text>
        ) : null}
      </View>
      <View style={styles.status}>
        {unread ? (
          <Circle
            color={theme.semantic.accent}
            fill={theme.semantic.accent}
            size={theme.space[3]}
          />
        ) : (
          <Check
            color={theme.semantic.textMuted}
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
