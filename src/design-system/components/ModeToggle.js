import React, { createElement, isValidElement } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../theme";
import { Text } from "./Text";

export function ModeToggle({ options, value, onChange, style }) {
  const theme = useTheme();
  const palette = theme.groupsScreen;

  const renderIcon = (icon, selected) => {
    if (!icon) {
      return null;
    }

    if (typeof icon === "string") {
      return (
        <Text
          variant="bodySmall"
          color={selected ? palette.tabActiveText : palette.tabInactiveText}
        >
          {icon}
        </Text>
      );
    }

    if (isValidElement(icon)) {
      return icon;
    }

    return createElement(icon, {
      color: selected ? palette.tabActiveText : palette.tabInactiveText,
      size: theme.space[4],
      strokeWidth: theme.borderWidths.medium,
    });
  };

  return (
    <View style={[styles.root, { gap: theme.space[3] }, style]}>
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={option.value}
            onPress={() => onChange?.(option.value)}
            style={({ pressed }) => [
              styles.pill,
              {
                backgroundColor: selected
                  ? palette.tabActiveBackground
                  : palette.tabsBackground,
                borderColor: selected
                  ? palette.tabActiveBackground
                  : theme.colors.transparent,
                borderRadius: theme.radii.full,
                minHeight: 36,
                opacity: pressed ? 0.8 : 1,
                paddingHorizontal: 18,
                paddingVertical: 8,
              },
            ]}
          >
            {renderIcon(option.icon, selected)}
            <Text
              variant="field"
              color={selected ? palette.tabActiveText : palette.tabInactiveText}
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
  root: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  pill: {
    alignItems: "center",
    borderWidth: 0.5,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
});
