import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text, useTheme } from "../../../design-system";

export const ActivityItem = memo(function ActivityItem({ activity }) {
  const theme = useTheme();
  const hasAmount = activity.amount !== null && activity.amount !== undefined;
  const amount = hasAmount
    ? String(activity.amount).replace(/^[+-]\s*/, "")
    : null;
  const headline = activity.headline;

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
        {headline ? (
          <Text variant="bodySmall" color="text" numberOfLines={1}>
            {headline}
          </Text>
        ) : (
          <Text variant="bodySmall" color="text" numberOfLines={1}>
            <Text
              variant="bodySmall"
              color="text"
              style={{ fontWeight: theme.fontWeights.semibold }}
            >
              {activity.user}
            </Text>{" "}
            {activity.action} {activity.title}
          </Text>
        )}
        <Text variant="label" color="textMuted">
          {activity.timestamp}
        </Text>
      </View>
      {hasAmount ? (
        <View style={styles.amount}>
          <Text variant="field" color={activity.tone}>
            {amount}
          </Text>
          {activity.label ? (
            <Text variant="micro" color="textMuted">
              {activity.label}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  amount: {
    alignItems: "flex-end",
  },
  root: {
    alignItems: "center",
    borderBottomWidth: 0.5,
    flexDirection: "row",
  },
  content: {
    flex: 1,
  },
});
