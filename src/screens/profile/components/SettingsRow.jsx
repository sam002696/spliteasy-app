import React from "react";
import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function SettingsRow({ disabled = false, isLast = false, onPress, row }) {
  const theme = useTheme();
  const Icon = row.icon;
  const tone = row.tone || "default";
  const isDanger = tone === "danger";
  const hasSwitch = row.control === "switch";
  const iconPalette =
    theme.profile.iconTiles[row.id] || theme.profile.iconTiles.notifications;

  return (
    <Pressable
      accessibilityRole={hasSwitch ? "switch" : "button"}
      accessibilityState={hasSwitch ? { checked: row.valueEnabled } : undefined}
      disabled={disabled}
      onPress={hasSwitch ? undefined : onPress}
      style={({ pressed }) => [
        styles.root,
        {
          backgroundColor: theme.profile.rowBackground,
          borderBottomColor: theme.profile.rowSeparator,
          borderBottomWidth: isLast ? 0 : theme.borderWidths.hairline,
          gap: theme.space[3],
          minHeight: theme.sizes.minTapTarget + theme.space[6],
          opacity: disabled ? 0.58 : pressed ? 0.78 : 1,
          paddingHorizontal: theme.space[4],
          paddingVertical: theme.space[3],
        },
      ]}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: iconPalette.background,
          borderRadius: theme.radii.lg,
          height: theme.sizes.iconButton,
          justifyContent: "center",
          width: theme.sizes.iconButton,
        }}
      >
        <Icon
          color={iconPalette.icon}
          size={theme.space[5]}
          strokeWidth={theme.borderWidths.medium}
        />
      </View>
      <View style={{ flex: 1, gap: theme.space[1] }}>
        <Text variant="field" color={isDanger ? "danger" : "text"} numberOfLines={1}>
          {row.label}
        </Text>
        <Text variant="bodySmall" color="textMuted" numberOfLines={1}>
          {row.value}
        </Text>
      </View>
      {hasSwitch ? (
        <View style={styles.switchSlot}>
          <Switch
            disabled={disabled}
            ios_backgroundColor={theme.semantic.border}
            onValueChange={row.onValueChange}
            style={styles.switch}
            thumbColor={theme.colors.white}
            trackColor={{
              false: theme.semantic.border,
              true: theme.profile.actionBackground,
            }}
            value={row.valueEnabled}
          />
        </View>
      ) : (
        <ChevronRight
          color={isDanger ? theme.semantic.danger : theme.profile.chevron}
          size={theme.space[5]}
          strokeWidth={theme.borderWidths.medium}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "row",
  },
  switch: {
    transform: [{ scale: 0.86 }],
  },
  switchSlot: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    marginRight: -4,
    width: 58,
  },
});
