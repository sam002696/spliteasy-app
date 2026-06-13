import React from "react";
import { Briefcase, Heart, Home, Send, Users } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

const categoryIcons = {
  Family: Heart,
  Friends: Users,
  Roommates: Home,
  Team: Briefcase,
  Trip: Send,
};

export function SelectChips({ options, value, onChange }) {
  const theme = useTheme();
  const palette = theme.createGroupScreen;

  return (
    <View
      style={[
        styles.root,
        { columnGap: theme.space[2], rowGap: theme.space[3] },
      ]}
    >
      {options.map((option) => {
        const selected = option.value === value;
        const Icon = categoryIcons[option.value];
        const foregroundColor = selected
          ? palette.selectedChipText
          : palette.chipText;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={option.value}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor: selected
                  ? palette.selectedChipBackground
                  : palette.chipBackground,
                borderColor: selected
                  ? palette.selectedChipBackground
                  : theme.colors.transparent,
                borderRadius: theme.radii.full,
                borderWidth: theme.borderWidths.hairline,
                gap: theme.space[2],
                minHeight: theme.sizes.minTapTarget,
                opacity: pressed ? 0.78 : 1,
                paddingLeft: theme.space[3],
                paddingHorizontal: theme.space[4],
              },
            ]}
          >
            {Icon ? (
              <Icon
                color={foregroundColor}
                size={theme.space[4]}
                strokeWidth={theme.borderWidths.medium}
              />
            ) : null}
            <Text variant="field" color={foregroundColor}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  root: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
