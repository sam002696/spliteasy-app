import React from "react";
import { X } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function ModalHeader({ onClose }) {
  const theme = useTheme();

  return (
    <View style={[styles.root, { marginBottom: theme.space[6], marginTop: theme.space[4] }]}>
      <View style={{ flex: 1, gap: theme.space[1] }}>
        <Text variant="label" color="textMuted" uppercase>
          New group
        </Text>
        <Text variant="screenTitle" color="text">
          Create group
        </Text>
      </View>
      <Pressable
        accessibilityLabel="Close create group"
        accessibilityRole="button"
        hitSlop={theme.space[2]}
        onPress={onClose}
        style={({ pressed }) => [
          styles.close,
          {
            backgroundColor: theme.semantic.surface,
            borderRadius: theme.radii.full,
            height: theme.sizes.iconButton,
            opacity: pressed ? 0.78 : 1,
            width: theme.sizes.iconButton,
          },
        ]}
      >
        <X
          color={theme.semantic.text}
          size={theme.space[5]}
          strokeWidth={theme.borderWidths.medium}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  close: {
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    alignItems: "center",
    flexDirection: "row",
  },
});
