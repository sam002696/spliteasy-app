import React from "react";
import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function SettingsRow({ disabled = false, onPress, row }) {
  const theme = useTheme();
  const Icon = row.icon;
  const tone = row.tone || "default";
  const isDanger = tone === "danger";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.root,
        {
          backgroundColor: theme.semantic.surface,
          borderRadius: theme.radii.md,
          gap: theme.space[3],
          minHeight: theme.sizes.minTapTarget + theme.space[3],
          opacity: disabled ? 0.58 : pressed ? 0.78 : 1,
          paddingHorizontal: theme.space[4],
        },
      ]}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: isDanger ? theme.semantic.danger : theme.semantic.surfaceStrong,
          borderRadius: theme.radii.full,
          height: theme.sizes.iconButton,
          justifyContent: "center",
          width: theme.sizes.iconButton,
        }}
      >
        <Icon
          color={isDanger ? theme.colors.white : theme.semantic.accent}
          size={theme.space[5]}
          strokeWidth={theme.borderWidths.medium}
        />
      </View>
      <View style={{ flex: 1, gap: theme.space[1] }}>
        <Text variant="bodySmall" color={isDanger ? "danger" : "text"} numberOfLines={1}>
          {row.label}
        </Text>
        <Text variant="label" color="textMuted" numberOfLines={1}>
          {row.value}
        </Text>
      </View>
      <ChevronRight
        color={isDanger ? theme.semantic.danger : theme.semantic.textMuted}
        size={theme.space[5]}
        strokeWidth={theme.borderWidths.medium}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "row",
  },
});
