import React from "react";
import { ChevronLeft, MoreHorizontal } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Badge, Text, useTheme } from "../../../design-system";

function HeaderButton({ disabled = false, icon: Icon, label, onPress }) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      disabled={disabled}
      hitSlop={theme.space[2]}
      onPress={onPress}
      style={({ pressed }) => [
        styles.headerButton,
        {
          backgroundColor: theme.semantic.surface,
          borderRadius: theme.radii.full,
          height: theme.sizes.iconButton,
          opacity: disabled ? 0.45 : pressed ? 0.78 : 1,
          width: theme.sizes.iconButton,
        },
      ]}
    >
      <Icon
        color={theme.semantic.text}
        size={theme.space[5]}
        strokeWidth={theme.borderWidths.medium}
      />
    </Pressable>
  );
}

export function GroupDetailHeader({ group, onBack, onOpenOptions, optionsDisabled = false }) {
  const theme = useTheme();

  return (
    <View style={[styles.root, { marginBottom: theme.space[5] }]}>
      <HeaderButton icon={ChevronLeft} label="Back" onPress={onBack} />
      <View
        style={[
          styles.titleBlock,
          { gap: theme.space[1], marginLeft: theme.space[2] },
        ]}
      >
        <Text variant="screenTitle" color="text" numberOfLines={1}>
          {group.name}
        </Text>
        <View style={[styles.meta, { gap: theme.space[2] }]}>
          <Badge label={group.category} tone={group.categoryTone} />
          <Text variant="label" color="textMuted">
            {group.memberCount} members
          </Text>
        </View>
      </View>
      <HeaderButton
        disabled={optionsDisabled}
        icon={MoreHorizontal}
        label="Group options"
        onPress={onOpenOptions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  meta: {
    alignItems: "center",
    flexDirection: "row",
  },
  root: {
    alignItems: "center",
    flexDirection: "row",
  },
  titleBlock: {
    flex: 1,
  },
});
