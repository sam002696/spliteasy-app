import React from "react";
import { Check, X } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Badge,
  Button,
  Card,
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
  const isBusy = accepting || rejecting;

  return (
    <Card variant="black">
      <View style={[styles.header, { gap: theme.space[3] }]}>
        <Avatar name={invitation.groupName} />
        <View style={{ flex: 1, gap: theme.space[1] }}>
          <Text variant="cardTitle" color="white" numberOfLines={1}>
            {invitation.groupName}
          </Text>
          <Text variant="label" color="white50" numberOfLines={1}>
            Invited by {invitation.invitedByName}
          </Text>
        </View>
        <Badge label={invitation.category} tone={invitation.categoryTone} />
      </View>

      <View style={{ gap: theme.space[3], marginTop: theme.space[4] }}>
        <View style={styles.metaRow}>
          <Text variant="label" color="white50">
            {invitation.requestedAt}
          </Text>
          <Text variant="label" color="white50">
            {invitation.memberCount} members · {invitation.expenseCount} expenses
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
            style={{ flex: 1, borderColor: theme.rgba.white10 }}
            textStyle={{ color: theme.colors.white }}
            left={
              <X
                color={theme.colors.white}
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
            style={{ flex: 1 }}
            left={
              accepting ? null : (
                <Check
                  color={theme.semantic.accentText}
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
