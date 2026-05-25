import React from "react";
import { CalendarDays, CircleCheck, ReceiptText, UserRound } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "../../../design-system";

function Meta({ icon: Icon, children }) {
  const theme = useTheme();

  return (
    <View style={[styles.meta, { gap: theme.space[1] }]}>
      <Icon
        color={theme.semantic.textMuted}
        size={theme.space[4]}
        strokeWidth={theme.borderWidths.medium}
      />
      <Text variant="label" color="textMuted" numberOfLines={1}>
        {children}
      </Text>
    </View>
  );
}

export function ExpenseRow({ expense }) {
  const theme = useTheme();
  const isSettled = expense.status === "Settled";

  return (
    <Card variant="plain" style={{ borderWidth: theme.borderWidths.hairline, borderColor: theme.semantic.border }}>
      <View style={styles.root}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.semantic.surfaceStrong,
            borderRadius: theme.radii.full,
            height: theme.sizes.iconButton,
            justifyContent: "center",
            width: theme.sizes.iconButton,
          }}
        >
          <ReceiptText
            color={theme.semantic.accent}
            size={theme.space[5]}
            strokeWidth={theme.borderWidths.medium}
          />
        </View>
        <View style={[styles.content, { gap: theme.space[2] }]}>
          <View style={styles.titleRow}>
            <Text variant="cardTitle" color="text" numberOfLines={1} style={{ flex: 1 }}>
              {expense.title}
            </Text>
            <Text variant="field" color="text">
              {expense.amount}
            </Text>
          </View>
          <View style={[styles.metaRow, { gap: theme.space[3] }]}>
            <Meta icon={UserRound}>Paid by {expense.paidBy}</Meta>
            <Meta icon={CalendarDays}>{expense.date}</Meta>
          </View>
          <View style={styles.titleRow}>
            <Text variant="label" color="textMuted">
              Your share {expense.yourShare}
            </Text>
            <View style={[styles.status, { gap: theme.space[1] }]}>
              {isSettled ? (
                <CircleCheck
                  color={theme.semantic.positive}
                  size={theme.space[4]}
                  strokeWidth={theme.borderWidths.medium}
                />
              ) : null}
              <Text variant="micro" color={isSettled ? "positive" : "danger"}>
                {expense.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  meta: {
    alignItems: "center",
    flexDirection: "row",
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  root: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
  },
  status: {
    alignItems: "center",
    flexDirection: "row",
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
