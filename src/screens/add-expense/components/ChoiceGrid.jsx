import React from "react";
import { Check } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function ChoiceGrid({ options, value, onChange }) {
  const theme = useTheme();

  return (
    <View style={[styles.root, { gap: theme.space[2] }]}>
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={option.value}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              styles.choice,
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
            {selected ? (
              <Check
                color={theme.semantic.accent}
                size={theme.space[4]}
                strokeWidth={theme.borderWidths.medium}
              />
            ) : null}
            <Text variant="bodySmall" color={selected ? "accent" : "text"}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  choice: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  root: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
