import React from "react";
import { Settings } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";
import { AnimatedSection } from "./AnimatedSection";

export function ProfileHeader() {
  const theme = useTheme();

  return (
    <AnimatedSection>
      <View style={[styles.root, { marginBottom: theme.space[5] }]}>
        <View style={{ flex: 1, gap: theme.space[1] }}>
          <Text variant="label" color="textMuted" uppercase>
            Account
          </Text>
          <Text variant="screenTitle" color="text">
            Profile
          </Text>
        </View>
        <Pressable
          accessibilityLabel="Profile settings"
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
          <Settings
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
