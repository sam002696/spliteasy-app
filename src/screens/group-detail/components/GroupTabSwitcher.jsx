import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function GroupTabSwitcher({ tabs, value, onChange }) {
  const theme = useTheme();
  const palette = theme.groupsScreen;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: palette.tabsBackground,
          borderRadius: theme.radii.full,
          gap: theme.space[1],
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
                backgroundColor: selected
                  ? palette.tabActiveBackground
                  : theme.colors.transparent,
                borderRadius: theme.radii.full,
                minHeight: theme.sizes.minTapTarget,
                opacity: pressed ? 0.78 : 1,
              },
            ]}
          >
            <Text
              variant="field"
              color={selected ? palette.tabActiveText : palette.tabInactiveText}
            >
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
