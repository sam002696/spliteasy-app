import React from "react";
import { Mail, ShieldCheck } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { Avatar, Badge, Card, Text, useTheme } from "../../../design-system";

export function MemberRow({ member }) {
  const theme = useTheme();

  return (
    <Card variant="plain" style={{ borderWidth: theme.borderWidths.hairline, borderColor: theme.semantic.border }}>
      <View style={[styles.row, { gap: theme.space[3] }]}>
        <Avatar name={member.name} />
        <View style={{ flex: 1, gap: theme.space[1] }}>
          <Text variant="cardTitle" color="text" numberOfLines={1}>
            {member.name}
          </Text>
          <View style={[styles.meta, { gap: theme.space[1] }]}>
            <Mail
              color={theme.semantic.textMuted}
              size={theme.space[4]}
              strokeWidth={theme.borderWidths.medium}
            />
            <Text variant="label" color="textMuted" numberOfLines={1}>
              {member.email}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end", gap: theme.space[2] }}>
          <Badge label={member.status} tone={member.status === "You" ? "lime" : "neutral"} />
          <View style={[styles.meta, { gap: theme.space[1] }]}>
            <ShieldCheck
              color={theme.semantic[member.tone]}
              size={theme.space[4]}
              strokeWidth={theme.borderWidths.medium}
            />
            <Text variant="micro" color={member.tone}>
              {member.balance}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  meta: {
    alignItems: "center",
    flexDirection: "row",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
});
