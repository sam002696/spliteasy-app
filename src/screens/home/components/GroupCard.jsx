import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Avatar, Badge, Card, Divider, Text, useTheme } from "../../../design-system";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
            borderColor: theme.semantic.surfaceStrong,
            borderWidth: theme.borderWidths.medium,
            marginLeft: index === 0 ? 0 : -theme.space[2],
          }}
        />
      ))}
    </View>
  );
}

export function GroupCard({ group, index = 0, onPress }) {
  const theme = useTheme();
  const pressed = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(theme.space[4]);
  const cardWidth = theme.space[8] * 8 + theme.space[6];
  const cardMinHeight = theme.space[8] * 5 + theme.space[6];

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
          <View style={{ flex: 1, gap: theme.space[1] }}>
            <Text variant="cardTitle" color="white" numberOfLines={1}>
              {group.name}
            </Text>
            <Text variant="label" color="white50">
              {group.memberCount} members
            </Text>
          </View>
          <Badge label={group.category} tone={group.categoryTone} />
        </View>

        <View style={{ marginTop: theme.space[5], gap: theme.space[1] }}>
          <Text variant="label" color="white50">
            Latest expense
          </Text>
          <Text variant="bodySmall" color="white" numberOfLines={1}>
            {group.latestExpense}
          </Text>
        </View>

        <Divider color="white10" style={{ marginVertical: theme.space[4] }} />

        <View style={styles.cardBottom}>
          <View style={{ gap: theme.space[1] }}>
            <Text variant="cardAmount" color={group.balanceTone}>
              {group.balance}
            </Text>
            <Text variant="label" color="white50">
              Your balance
            </Text>
          </View>
          <AvatarStack members={group.members} />
        </View>
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
