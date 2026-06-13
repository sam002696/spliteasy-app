import React from "react";
import { Check } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function ChoiceGrid({ options, value, onChange }) {
  const theme = useTheme();
  const palette = theme.addExpenseScreen;

  return (
    <View
      style={[
        styles.root,
        { columnGap: theme.space[2], rowGap: theme.space[3] },
      ]}
    >
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
                backgroundColor: selected
                  ? palette.selectedBackground
                  : palette.optionBackground,
                borderColor: selected
                  ? palette.selectedBackground
                  : theme.colors.transparent,
                borderRadius: theme.radii.full,
                borderWidth: theme.borderWidths.hairline,
                gap: theme.space[2],
                minHeight: theme.sizes.minTapTarget,
                opacity: pressed ? 0.78 : 1,
                paddingHorizontal: theme.space[4],
              },
            ]}
          >
            {selected ? (
              <Check
                color={palette.selectedText}
                size={theme.space[4]}
                strokeWidth={theme.borderWidths.medium}
              />
            ) : null}
            <Text
              variant="field"
              color={selected ? palette.selectedText : palette.optionText}
            >
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
