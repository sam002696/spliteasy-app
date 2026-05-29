import React from "react";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function GroupRequestsHeader({ onBack }) {
  const theme = useTheme();

  return (
    <View style={[styles.root, { marginBottom: theme.space[5] }]}>
      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        hitSlop={theme.space[2]}
        onPress={onBack}
        style={({ pressed }) => [
          styles.backButton,
          {
            backgroundColor: theme.semantic.surface,
            borderRadius: theme.radii.full,
            height: theme.sizes.iconButton,
            opacity: pressed ? 0.78 : 1,
            width: theme.sizes.iconButton,
          },
        ]}
      >
        <ArrowLeft
          color={theme.semantic.text}
          size={theme.space[5]}
          strokeWidth={theme.borderWidths.medium}
        />
      </Pressable>
      <View style={{ flex: 1, gap: theme.space[1] }}>
        <Text variant="label" color="textMuted" uppercase>
          Invitations
        </Text>
        <Text variant="screenTitle" color="text">
          Group requests
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
});
