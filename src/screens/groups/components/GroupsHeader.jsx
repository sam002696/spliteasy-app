import React from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";
import { AnimatedSection } from "./AnimatedSection";

function HeaderIconButton({ icon: Icon, label, tone = "neutral", onPress }) {
  const theme = useTheme();
  const isDark = tone === "dark";

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      hitSlop={theme.space[2]}
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        {
          backgroundColor: isDark
            ? theme.semantic.surfaceStrong
            : theme.semantic.surface,
          borderRadius: theme.radii.full,
          height: theme.sizes.iconButton,
          opacity: pressed ? 0.78 : 1,
          width: theme.sizes.iconButton,
        },
      ]}
    >
      <Icon
        color={isDark ? theme.semantic.accent : theme.semantic.text}
        size={theme.space[5]}
        strokeWidth={theme.borderWidths.medium}
      />
    </Pressable>
  );
}

export function GroupsHeader({ onCreateGroup }) {
  const theme = useTheme();

  return (
    <AnimatedSection>
      <View style={[styles.root, { marginBottom: theme.space[5] }]}>
        <View>
          <Text variant="screenTitle" color="text">
            Groups
          </Text>
        </View>
        <View style={[styles.actions, { gap: theme.space[2] }]}>
          <HeaderIconButton icon={Search} label="Search groups" />
          <HeaderIconButton icon={SlidersHorizontal} label="Filter groups" />
          <HeaderIconButton
            icon={Plus}
            label="Create group"
            tone="dark"
            onPress={onCreateGroup}
          />
        </View>
      </View>
    </AnimatedSection>
  );
}

const styles = StyleSheet.create({
  actions: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
