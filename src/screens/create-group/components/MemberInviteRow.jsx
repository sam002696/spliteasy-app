import React from "react";
import { UserPlus } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Avatar, Text, useTheme } from "../../../design-system";

export function MemberInviteRow({ member }) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.root,
        {
          backgroundColor: theme.semantic.surface,
          borderRadius: theme.radii.md,
          gap: theme.space[3],
          opacity: pressed ? 0.78 : 1,
          padding: theme.space[3],
        },
      ]}
    >
      <Avatar name={member.name} size="md" />
      <View style={{ flex: 1, gap: theme.space[1] }}>
        <Text variant="bodySmall" color="text" numberOfLines={1}>
          {member.name}
        </Text>
        <Text variant="label" color="textMuted" numberOfLines={1}>
          {member.email}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          backgroundColor: theme.semantic.surfaceStrong,
          borderRadius: theme.radii.full,
          height: theme.sizes.minTapTarget,
          justifyContent: "center",
          width: theme.sizes.minTapTarget,
        }}
      >
        <UserPlus
          color={theme.semantic.accent}
          size={theme.space[5]}
          strokeWidth={theme.borderWidths.medium}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "row",
  },
});
