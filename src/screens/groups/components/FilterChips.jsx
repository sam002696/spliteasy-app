import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";
import { AnimatedSection } from "./AnimatedSection";

export function FilterChips({ filters, value, onChange }) {
  const theme = useTheme();
  const palette = theme.groupsScreen;

  return (
    <AnimatedSection delay={theme.motion.normal}>
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
        {filters.map((filter) => {
          const selected = filter.value === value;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={filter.value}
              onPress={() => onChange(filter.value)}
              style={({ pressed }) => [
                styles.chip,
                {
                  backgroundColor: selected
                    ? palette.tabActiveBackground
                    : theme.colors.transparent,
                  borderRadius: theme.radii.full,
                  minHeight: theme.sizes.minTapTarget,
                  opacity: pressed ? 0.78 : 1,
                  paddingHorizontal: theme.space[4],
                },
              ]}
            >
              <Text
                variant="field"
                color={
                  selected ? palette.tabActiveText : palette.tabInactiveText
                }
              >
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </AnimatedSection>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
