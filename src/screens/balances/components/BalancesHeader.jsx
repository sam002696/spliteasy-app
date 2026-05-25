import React from "react";
import { SlidersHorizontal } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";
import { AnimatedSection } from "./AnimatedSection";

export function BalancesHeader() {
  const theme = useTheme();

  return (
    <AnimatedSection>
      <View style={[styles.root, { marginBottom: theme.space[5] }]}>
        <View style={{ flex: 1, gap: theme.space[1] }}>
          <Text variant="label" color="textMuted" uppercase>
            Across all groups
          </Text>
          <Text variant="screenTitle" color="text">
            Balances
          </Text>
        </View>
        <Pressable
          accessibilityLabel="Filter balances"
          accessibilityRole="button"
          hitSlop={theme.space[2]}
          style={({ pressed }) => [
            styles.action,
            {
              backgroundColor: theme.semantic.surface,
              borderRadius: theme.radii.full,
              height: theme.sizes.iconButton,
              opacity: pressed ? 0.78 : 1,
              width: theme.sizes.iconButton,
            },
          ]}
        >
          <SlidersHorizontal
            color={theme.semantic.text}
            size={theme.space[5]}
            strokeWidth={theme.borderWidths.medium}
          />
        </Pressable>
      </View>
    </AnimatedSection>
  );
}

const styles = StyleSheet.create({
  action: {
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    alignItems: "center",
    flexDirection: "row",
  },
});
