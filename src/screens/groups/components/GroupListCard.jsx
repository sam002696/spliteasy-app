import React, { useEffect } from "react";
import { ChevronRight, Clock3, ReceiptText, TrendingDown, TrendingUp, Users } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Badge, Card, Divider, ProgressBar, Text, useTheme } from "../../../design-system";
import { MemberStack } from "./MemberStack";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function BalanceIcon({ tone }) {
  const theme = useTheme();
  const Icon = tone === "negative" ? TrendingDown : TrendingUp;
  const color = tone === "negative" ? theme.semantic.negative : theme.semantic.positive;

  if (tone === "settled") {
    return null;
  }

  return <Icon color={color} size={theme.space[5]} strokeWidth={theme.borderWidths.medium} />;
}

function MetaItem({ icon: Icon, children }) {
  const theme = useTheme();

  return (
    <View style={[styles.metaItem, { gap: theme.space[1] }]}>
      <Icon
        color={theme.rgba.white50}
        size={theme.space[4]}
        strokeWidth={theme.borderWidths.medium}
      />
      <Text variant="label" color="white50" numberOfLines={1}>
        {children}
      </Text>
    </View>
  );
}

export function GroupListCard({ group, index, onPress }) {
  const theme = useTheme();
  const pressed = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(theme.space[4]);
  const balanceTone = group.balanceTone === "settled" ? "positive" : group.balanceTone;
  const balanceColor = group.balanceTone === "negative" ? "negative" : "positive";

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
      onPress={onPress}
      onPressIn={() => {
        pressed.value = 1;
      }}
      onPressOut={() => {
        pressed.value = 0;
      }}
      style={animatedStyle}
    >
      <Card variant="black">
        <View style={styles.topRow}>
          <View style={{ flex: 1, gap: theme.space[1] }}>
            <Text variant="sectionTitle" color="white" numberOfLines={1}>
              {group.name}
            </Text>
            <View style={[styles.metaRow, { gap: theme.space[3] }]}>
              <MetaItem icon={Users}>{group.memberCount} members</MetaItem>
              <MetaItem icon={ReceiptText}>{group.activityCount}</MetaItem>
            </View>
          </View>
          <Badge label={group.category} tone={group.categoryTone} />
        </View>

        <View style={{ marginTop: theme.space[5], gap: theme.space[2] }}>
          <Text variant="label" color="white50">
            Latest expense
          </Text>
          <View style={styles.latestRow}>
            <Text variant="body" color="white" numberOfLines={1} style={styles.latestText}>
              {group.latestExpense}
            </Text>
            <View style={[styles.time, { gap: theme.space[1] }]}>
              <Clock3
                color={theme.rgba.white50}
                size={theme.space[4]}
                strokeWidth={theme.borderWidths.medium}
              />
              <Text variant="label" color="white50" numberOfLines={1}>
                {group.updatedAt}
              </Text>
            </View>
          </View>
        </View>

        <Divider color="white10" style={{ marginVertical: theme.space[4] }} />

        <View style={styles.balanceRow}>
          <View style={{ flex: 1, gap: theme.space[2] }}>
            <View style={[styles.balanceTextRow, { gap: theme.space[2] }]}>
              <BalanceIcon tone={group.balanceTone} />
              <Text variant="cardAmount" color={balanceColor} numberOfLines={1}>
                {group.balance}
              </Text>
            </View>
            <ProgressBar
              value={group.settlementProgress}
              max={1}
              tone={balanceTone}
              height={theme.space[2]}
            />
          </View>
          <MemberStack members={group.members} count={group.memberCount} />
          <ChevronRight
            color={theme.rgba.white50}
            size={theme.space[5]}
            strokeWidth={theme.borderWidths.medium}
          />
        </View>
      </Card>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  balanceRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  balanceTextRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  latestRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  latestText: {
    flex: 1,
  },
  metaItem: {
    alignItems: "center",
    flexDirection: "row",
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  time: {
    alignItems: "center",
    flexDirection: "row",
  },
  topRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
