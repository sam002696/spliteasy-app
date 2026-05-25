import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text, useTheme } from "../../../design-system";

export const ActivityItem = memo(function ActivityItem({ activity }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.root,
        {
          borderBottomColor: theme.semantic.border,
          gap: theme.space[3],
          paddingVertical: theme.space[3],
        },
      ]}
    >
      <Avatar name={activity.user} size="md" />
      <View style={[styles.content, { gap: theme.space[1] }]}>
        <Text variant="bodySmall" color="text" numberOfLines={1}>
          <Text variant="bodySmall" color="text" style={{ fontWeight: theme.fontWeights.semibold }}>
            {activity.user}
          </Text>{" "}
          {activity.action} {activity.title}
        </Text>
        <Text variant="label" color="textMuted">
          {activity.timestamp}
        </Text>
      </View>
      <Text variant="field" color={activity.tone}>
        {activity.amount}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    borderBottomWidth: 0.5,
    flexDirection: "row",
  },
  content: {
    flex: 1,
  },
});
