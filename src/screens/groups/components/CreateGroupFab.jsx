import React from "react";
import { Plus } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "../../../design-system";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function CreateGroupFab({ onPress }) {
  const theme = useTheme();
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(pressed.value ? 0.94 : 1, {
          damping: 16,
          stiffness: 220,
        }),
      },
    ],
  }));

  return (
    <AnimatedPressable
      accessibilityLabel="Create group"
      accessibilityRole="button"
      onPress={onPress}
      onPressIn={() => {
        pressed.value = 1;
      }}
      onPressOut={() => {
        pressed.value = 0;
      }}
      style={[
        styles.fab,
        theme.shadows.raised,
        {
          backgroundColor: theme.semantic.accent,
          borderRadius: theme.radii.full,
          bottom: theme.space[4],
          height: theme.sizes.fab,
          right: theme.space[4],
          width: theme.sizes.fab,
          zIndex: theme.zIndices.overlay,
        },
        animatedStyle,
      ]}
    >
      <Plus
        color={theme.semantic.accentText}
        size={theme.space[6]}
        strokeWidth={theme.borderWidths.medium}
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
