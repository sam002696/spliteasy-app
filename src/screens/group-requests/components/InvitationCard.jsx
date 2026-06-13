import React from "react";
import { Check, X } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Text,
  useTheme,
} from "../../../design-system";

export function InvitationCard({
  accepting = false,
  invitation,
  onAccept,
  onReject,
  rejecting = false,
}) {
  const theme = useTheme();
  const palette = theme.groupRequestsScreen;
  const isBusy = accepting || rejecting;

  return (
    <Card
      variant="plain"
      style={{
        backgroundColor: palette.cardBackground,
        borderRadius: theme.radii.xl,
      }}
    >
      <View style={[styles.header, { gap: theme.space[3] }]}>
        <Avatar
          name={invitation.groupName}
          textColor={palette.avatarText}
          style={{ backgroundColor: palette.avatarBackground }}
          textStyle={theme.typography.field}
        />
        <View style={{ flex: 1, gap: theme.space[1] }}>
          <Text variant="cardTitle" color="text" numberOfLines={1}>
            {invitation.groupName}
          </Text>
          <Text variant="label" color={palette.metaText} numberOfLines={1}>
            Invited by {invitation.invitedByName}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: palette.categoryBackground,
            borderRadius: theme.radii.full,
            paddingHorizontal: theme.space[3],
            paddingVertical: theme.space[1],
          }}
        >
          <Text variant="micro" color={palette.categoryText}>
            {invitation.category}
          </Text>
        </View>
      </View>

      <Divider
        color={theme.groupDetailScreen.cardDivider}
        style={{ marginVertical: theme.space[4] }}
      />

      <View style={{ gap: theme.space[3] }}>
        <View style={styles.metaRow}>
          <Text variant="label" color={palette.metaText}>
            {invitation.requestedAt}
          </Text>
          <Text variant="label" color={palette.metaText}>
            {invitation.memberCount} members · {invitation.expenseCount}{" "}
            expenses
          </Text>
        </View>

        <View style={[styles.actions, { gap: theme.space[2] }]}>
          <Button
            title="Reject"
            variant="ghost"
            size="sm"
            disabled={isBusy}
            loading={rejecting}
            onPress={() => onReject?.(invitation.id)}
            style={{ flex: 1, borderColor: theme.semantic.border }}
            textStyle={{ color: palette.rejectText }}
            left={
              <X
                color={palette.rejectText}
                size={theme.space[4]}
                strokeWidth={theme.borderWidths.medium}
              />
            }
          />
          <Button
            title="Accept"
            variant="primary"
            size="sm"
            disabled={isBusy}
            loading={accepting}
            onPress={() => onAccept?.(invitation.id)}
            style={{
              backgroundColor: palette.actionBackground,
              borderColor: palette.actionBackground,
              flex: 1,
            }}
            textStyle={{ color: palette.actionText }}
            left={
              accepting ? null : (
                <Check
                  color={palette.actionText}
                  size={theme.space[4]}
                  strokeWidth={theme.borderWidths.medium}
                />
              )
            }
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
