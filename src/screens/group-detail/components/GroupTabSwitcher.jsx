import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function GroupTabSwitcher({ tabs, value, onChange }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: theme.semantic.surface,
          borderRadius: theme.radii.full,
          marginBottom: theme.space[5],
          padding: theme.space[1],
        },
      ]}
    >
      {tabs.map((tab) => {
        const selected = tab.value === value;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={tab.value}
            onPress={() => onChange(tab.value)}
            style={({ pressed }) => [
              styles.tab,
              {
                backgroundColor: selected ? theme.semantic.surfaceStrong : theme.colors.transparent,
                borderRadius: theme.radii.full,
                minHeight: theme.sizes.minTapTarget,
                opacity: pressed ? 0.78 : 1,
              },
            ]}
          >
            <Text variant="bodySmall" color={selected ? "accent" : "textMuted"}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
  },
  tab: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
