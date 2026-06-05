import React, { useEffect } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Avatar,
  Badge,
  Card,
  ProgressBar,
  Text,
  useTheme,
} from "../../../design-system";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function getPositionCopy(group) {
  if (group.balanceTone === "negative") {
    return { label: "You owe", amount: group.balance.replace(/^-\s*/, "") };
  }

  if (group.balanceTone === "settled") {
    return { label: "All settled", amount: group.balance };
  }

  return { label: "You are owed", amount: group.balance.replace(/^\+\s*/, "") };
}

function AvatarStack({ members }) {
  const theme = useTheme();

  return (
    <View style={styles.avatarStack}>
      {members.slice(0, 4).map((member, index) => (
        <Avatar
          key={member}
          name={member}
          size="sm"
          style={{
            backgroundColor: theme.semantic.accent,
            borderColor: theme.semantic.surfaceStrong,
            borderWidth: theme.borderWidths.medium,
            marginLeft: index === 0 ? 0 : -theme.space[2],
          }}
          textColor="accentText"
        />
      ))}
    </View>
  );
}

export function GroupCard({ group, index = 0, onPress }) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const pressed = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(theme.space[4]);
  const cardWidth = Math.min(width * 0.78, 300);
  const cardMinHeight = 230;
  const position = getPositionCopy(group);
  const progressTone =
    group.balanceTone === "negative" ? "negative" : "positive";

  useEffect(() => {
    const delay = theme.motion.fast + index * (theme.motion.fast / 3);
    opacity.value = withDelay(delay, withTiming(1, { duration: theme.motion.spring }));
    translateY.value = withDelay(delay, withTiming(0, { duration: theme.motion.spring }));
  }, [index, opacity, theme.motion.fast, theme.motion.spring, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      {
        scale: withSpring(pressed.value ? 0.98 : 1, {
          damping: 16,
          stiffness: 220,
        }),
      },
    ],
  }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPress={onPress}
      onPressIn={() => {
        pressed.value = 1;
      }}
      onPressOut={() => {
        pressed.value = 0;
      }}
      style={[animatedStyle, { width: cardWidth }]}
    >
      <Card variant="black" style={{ minHeight: cardMinHeight }}>
        <View style={styles.cardTop}>
          <View style={{ flex: 1, gap: theme.space[2] }}>
            <Text variant="cardTitle" color="white" numberOfLines={1}>
              {group.name}
            </Text>
            <Text variant="bodySmall" color="white50">
              {group.memberCount} members
            </Text>
          </View>
          <Badge
            label={group.category}
            tone={group.categoryTone}
            style={{ minHeight: 28, paddingHorizontal: theme.space[3] }}
          />
        </View>

        <View style={{ marginTop: theme.space[5], gap: theme.space[1] }}>
          <Text variant="label" color="white50">
            Latest expense
          </Text>
          <Text variant="body" color="white" numberOfLines={1}>
            {group.latestExpense}
          </Text>
        </View>

        <View style={[styles.cardBottom, { marginTop: "auto" }]}>
          <View style={{ flex: 1, gap: theme.space[1] }}>
            <Text variant="cardAmount" color={progressTone} numberOfLines={1}>
              {position.amount}
            </Text>
            <Text variant="bodySmall" color="white50">
              {position.label}
            </Text>
          </View>
          <AvatarStack members={group.members} />
        </View>
        <ProgressBar
          value={group.settlementProgress}
          max={1}
          tone={progressTone}
          height={theme.space[2]}
          style={{
            backgroundColor: theme.rgba.white10,
            marginTop: theme.space[3],
          }}
        />
      </Card>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  avatarStack: {
    flexDirection: "row",
  },
  cardTop: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBottom: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
