import React from "react";
import { CircleCheck } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text, useTheme } from "../../../design-system";

export function SettledBalanceRow({ settlement }) {
  const theme = useTheme();

  return (
    <Card variant="plain" style={{ borderColor: theme.semantic.border, borderWidth: theme.borderWidths.hairline }}>
      <View style={[styles.row, { gap: theme.space[3] }]}>
        <Avatar name={settlement.person} />
        <View style={{ flex: 1, gap: theme.space[1] }}>
          <Text variant="cardTitle" color="text" numberOfLines={1}>
            {settlement.person}
          </Text>
          <Text variant="label" color="textMuted" numberOfLines={1}>
            {settlement.group} · {settlement.settledAt}
          </Text>
        </View>
        <View style={[styles.status, { gap: theme.space[1] }]}>
          <CircleCheck
            color={theme.semantic.positive}
            size={theme.space[5]}
            strokeWidth={theme.borderWidths.medium}
          />
          <Text variant="field" color="positive">
            {settlement.amount}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  status: {
    alignItems: "flex-end",
  },
});
