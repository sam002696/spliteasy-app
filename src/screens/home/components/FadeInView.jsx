import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../../../design-system";

export function FadeInView({ children, delay = 0, style }) {
  const theme = useTheme();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(theme.space[3]);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: theme.motion.spring }));
    translateY.value = withDelay(delay, withTiming(0, { duration: theme.motion.spring }));
  }, [delay, opacity, theme.motion.spring, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
}
