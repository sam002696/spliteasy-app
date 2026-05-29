import React, { useEffect } from "react";
import { Bell, CircleCheck, TrendingDown, TrendingUp } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Avatar, Button, Card, ProgressBar, Text, useTheme } from "../../../design-system";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function DirectionIcon({ tone }) {
  const theme = useTheme();
  const Icon = tone === "negative" ? TrendingDown : TrendingUp;

  return (
    <Icon
      color={tone === "negative" ? theme.semantic.negative : theme.semantic.positive}
      size={theme.space[5]}
      strokeWidth={theme.borderWidths.medium}
    />
  );
}

export function OpenBalanceCard({
  actionLoading = false,
  balance,
  index = 0,
  onActionPress,
}) {
  const theme = useTheme();
  const pressed = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(theme.space[3]);
  const isDebt = balance.tone === "negative";
  const ActionIcon = isDebt ? CircleCheck : Bell;

  useEffect(() => {
    const delay = theme.motion.fast + index * (theme.motion.fast / 2);
    opacity.value = withDelay(delay, withTiming(1, { duration: theme.motion.spring }));
    translateY.value = withDelay(delay, withTiming(0, { duration: theme.motion.spring }));
  }, [index, opacity, theme.motion.fast, theme.motion.spring, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      {
        scale: withSpring(pressed.value ? 0.985 : 1, {
          damping: 18,
          stiffness: 220,
        }),
      },
    ],
  }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPressIn={() => {
        pressed.value = 1;
      }}
      onPressOut={() => {
        pressed.value = 0;
      }}
      style={animatedStyle}
    >
      <Card variant="black">
        <View style={[styles.header, { gap: theme.space[3] }]}>
          <Avatar name={balance.person} />
          <View style={{ flex: 1, gap: theme.space[1] }}>
            <Text variant="cardTitle" color="white" numberOfLines={1}>
              {balance.person}
            </Text>
            <Text variant="label" color="white50" numberOfLines={1}>
              {balance.group} · {balance.note}
            </Text>
          </View>
          <View style={[styles.amount, { gap: theme.space[1] }]}>
            <DirectionIcon tone={balance.tone} />
            <Text variant="cardAmount" color={balance.tone}>
              {balance.amount}
            </Text>
          </View>
        </View>

        <View style={{ gap: theme.space[3], marginTop: theme.space[4] }}>
          <View style={styles.detailRow}>
            <Text variant="label" color="white50">
              {balance.lastActivity}
            </Text>
            <Text variant="micro" color="white50">
              {Math.round(balance.progress * 100)}% settled
            </Text>
          </View>
          <ProgressBar value={balance.progress} max={1} tone={balance.tone} height={theme.space[2]} />
          <Button
            title={balance.action}
            variant={isDebt ? "danger" : "primary"}
            size="sm"
            fullWidth
            loading={actionLoading}
            onPress={() => onActionPress?.(balance)}
            left={
              <ActionIcon
                color={isDebt ? theme.colors.white : theme.semantic.accentText}
                size={theme.space[4]}
                strokeWidth={theme.borderWidths.medium}
              />
            }
          />
        </View>
      </Card>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  amount: {
    alignItems: "flex-end",
  },
  detailRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
});
