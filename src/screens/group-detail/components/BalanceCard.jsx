import React from "react";
import { Bell, CreditCard } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, ProgressBar, Text, useTheme } from "../../../design-system";

export function BalanceCard({ balance }) {
  const theme = useTheme();
  const isDebt = balance.tone === "negative";
  const Icon = isDebt ? CreditCard : Bell;

  return (
    <Card variant="black">
      <View style={[styles.row, { gap: theme.space[3] }]}>
        <Avatar name={balance.person} />
        <View style={{ flex: 1, gap: theme.space[1] }}>
          <Text variant="cardTitle" color="white" numberOfLines={1}>
            {balance.person}
          </Text>
          <Text variant="label" color="white50">
            {balance.note}
          </Text>
        </View>
        <Text variant="cardAmount" color={balance.tone}>
          {balance.amount}
        </Text>
      </View>
      <View style={{ gap: theme.space[3], marginTop: theme.space[4] }}>
        <ProgressBar value={balance.progress} max={1} tone={balance.tone} height={theme.space[2]} />
        <Button
          title={balance.action}
          variant={isDebt ? "danger" : "primary"}
          size="sm"
          fullWidth
          left={
            <Icon
              color={isDebt ? theme.colors.white : theme.semantic.accentText}
              size={theme.space[4]}
              strokeWidth={theme.borderWidths.medium}
            />
          }
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
});
