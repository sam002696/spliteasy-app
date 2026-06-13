import React from "react";
import { ArrowDown, ArrowUp, Bell, CircleCheck } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  ProgressBar,
  Text,
  useTheme,
} from "../../../design-system";

function StatusBadge({ isDebt }) {
  const theme = useTheme();
  const palette = theme.balancesScreen;
  const Icon = isDebt ? ArrowUp : ArrowDown;
  const backgroundColor = isDebt
    ? palette.debtBadgeBackground
    : palette.creditBadgeBackground;
  const color = isDebt ? palette.debtBadgeText : palette.creditBadgeText;

  return (
    <View
      style={[
        styles.statusBadge,
        {
          backgroundColor,
          borderRadius: theme.radii.full,
          gap: theme.space[1],
          paddingHorizontal: theme.space[2],
          paddingVertical: theme.space[1],
        },
      ]}
    >
      <Icon
        color={color}
        size={theme.space[3]}
        strokeWidth={theme.borderWidths.medium}
      />
      <Text variant="micro" color={color}>
        {isDebt ? "You owe" : "Owed to you"}
      </Text>
    </View>
  );
}

export function BalanceCard({ actionLoading = false, balance, onActionPress }) {
  const theme = useTheme();
  const palette = theme.groupDetailScreen;
  const isDebt = balance.tone === "negative";
  const Icon = isDebt ? CircleCheck : Bell;
  const progressPercent = Math.round(balance.progress * 100);

  return (
    <Card
      variant="plain"
      style={{
        backgroundColor: palette.cardBackground,
        borderRadius: theme.radii.xl,
      }}
    >
      <View style={[styles.row, { gap: theme.space[3] }]}>
        <Avatar
          name={balance.person}
          textColor={palette.avatarText}
          style={{ backgroundColor: palette.avatarBackground }}
          textStyle={theme.typography.field}
        />
        <View style={{ flex: 1, gap: theme.space[1] }}>
          <Text variant="cardTitle" color="text" numberOfLines={1}>
            {balance.person}
          </Text>
          <Text variant="label" color={palette.metaText}>
            {balance.note}
          </Text>
        </View>
        <View style={[styles.amount, { gap: theme.space[2] }]}>
          <Text variant="sectionTitle" color={balance.tone} numberOfLines={1}>
            {balance.amount}
          </Text>
          <StatusBadge isDebt={isDebt} />
        </View>
      </View>

      <Divider
        color={palette.cardDivider}
        style={{ marginVertical: theme.space[4] }}
      />

      <View style={[styles.progressHeader, { marginBottom: theme.space[2] }]}>
        <Text variant="field" color={palette.metaText} uppercase>
          Settlement
        </Text>
        <Text variant="field" color={isDebt ? "danger" : "positive"}>
          {progressPercent}% settled
        </Text>
      </View>

      <View style={{ gap: theme.space[4] }}>
        <ProgressBar
          value={balance.progress}
          max={1}
          tone={balance.tone}
          height={theme.space[2]}
          style={{ backgroundColor: theme.semantic.inactive }}
        />
        <Button
          title={balance.action}
          variant="danger"
          size="md"
          fullWidth
          disabled={!balance.canSettle && !balance.canRemind}
          loading={actionLoading}
          onPress={() => onActionPress?.(balance)}
          style={{
            backgroundColor: palette.actionBackground,
            borderColor: palette.actionBackground,
          }}
          textStyle={{ color: palette.actionText }}
          left={
            <Icon
              color={palette.actionText}
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
  amount: {
    alignItems: "flex-end",
  },
  progressHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  statusBadge: {
    alignItems: "center",
    flexDirection: "row",
  },
});
