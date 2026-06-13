import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text, useTheme } from "../../../design-system";

export const ActivityItem = memo(function ActivityItem({
  activity,
  isLast = false,
}) {
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
          backgroundColor: theme.homeActivity.cardBackground,
          borderRadius: theme.radii.lg,
          gap: theme.space[3],
          marginBottom: isLast ? 0 : theme.space[3],
          padding: theme.space[4],
        },
      ]}
    >
      <Avatar
        name={activity.user}
        size="md"
        textColor={theme.homeActivity.avatarText}
        style={{ backgroundColor: theme.homeActivity.avatarBackground }}
        textStyle={theme.typography.field}
      />
      <View style={[styles.content, { gap: theme.space[1] }]}>
        {headline ? (
          <Text variant="field" color="text" numberOfLines={1}>
            {headline}
          </Text>
        ) : (
          <Text variant="field" color="text" numberOfLines={1}>
            <Text
              variant="field"
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
        <View
          style={[
            styles.amount,
            {
              backgroundColor: theme.homeActivity.amountBackground,
              borderRadius: theme.radii.full,
              paddingHorizontal: theme.space[3],
              paddingVertical: theme.space[1],
            },
          ]}
        >
          <Text variant="field" color={activity.tone}>
            {amount}
          </Text>
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
    flexDirection: "row",
  },
  content: {
    flex: 1,
  },
});
