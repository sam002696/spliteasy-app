import React from "react";
import { Check, UserPlus, X } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Avatar, Text, useTheme } from "../../../design-system";

export function MemberInviteRow({ member, onPress, selected = false }) {
  const theme = useTheme();
  const Icon = selected ? Check : UserPlus;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.root,
        {
          backgroundColor: theme.semantic.surface,
          borderColor: selected
            ? theme.semantic.accent
            : theme.colors.transparent,
          borderWidth: theme.borderWidths.hairline,
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
        <Icon
          color={theme.semantic.accent}
          size={theme.space[5]}
          strokeWidth={theme.borderWidths.medium}
        />
      </View>
    </Pressable>
  );
}

export function SelectedInviteRow({ email, onRemove }) {
  const theme = useTheme();
  const palette = theme.createGroupScreen;

  return (
    <Pressable
      accessibilityLabel={`Remove ${email}`}
      accessibilityRole="button"
      onPress={onRemove}
      style={({ pressed }) => [
        styles.root,
        {
          backgroundColor: palette.cardBackground,
          borderRadius: theme.radii.lg,
          gap: theme.space[3],
          opacity: pressed ? 0.78 : 1,
          padding: theme.space[3],
        },
      ]}
    >
      <Avatar
        name={email}
        size="md"
        textColor={palette.inviteAvatarText}
        style={{ backgroundColor: palette.inviteAvatarBackground }}
        textStyle={theme.typography.field}
      />
      <View style={{ flex: 1, gap: theme.space[1] }}>
        <Text variant="field" color="text" numberOfLines={1}>
          {email}
        </Text>
        <View style={[styles.pendingRow, { gap: theme.space[1] }]}>
          <View
            style={{
              backgroundColor: palette.pendingDot,
              borderRadius: theme.radii.full,
              height: theme.space[2],
              width: theme.space[2],
            }}
          />
          <Text variant="label" color="textMuted" numberOfLines={1}>
            Pending invite
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          backgroundColor: palette.removeBackground,
          borderRadius: theme.radii.full,
          height: theme.sizes.minTapTarget,
          justifyContent: "center",
          width: theme.sizes.minTapTarget,
        }}
      >
        <X
          color={palette.removeIcon}
          size={theme.space[5]}
          strokeWidth={theme.borderWidths.medium}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pendingRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  root: {
    alignItems: "center",
    flexDirection: "row",
  },
});
