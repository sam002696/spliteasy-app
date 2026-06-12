import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";
import { AnimatedSection } from "./AnimatedSection";

export function BalanceFilterChips({ filters, value, onChange }) {
  const theme = useTheme();

  return (
    <AnimatedSection delay={theme.motion.normal}>
      <View style={[styles.root, { gap: theme.space[2], marginBottom: theme.space[5] }]}>
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
                  backgroundColor: selected ? theme.semantic.surfaceStrong : theme.semantic.surface,
                  borderColor: selected ? theme.semantic.surfaceStrong : theme.semantic.border,
                  borderRadius: theme.radii.full,
                  borderWidth: theme.borderWidths.hairline,
                  minHeight: theme.sizes.minTapTarget,
                  opacity: pressed ? 0.78 : 1,
                  paddingHorizontal: theme.space[4],
                },
              ]}
            >
              <Text variant="bodySmall" color={selected ? theme.colors.white : "text"}>
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
