import React, { useEffect } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import {
  ChevronRight,
  Clock3,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Badge,
  Card,
  Divider,
  ProgressBar,
  Text,
  useTheme,
} from "../../../design-system";
import { MemberStack } from "../../groups/components/MemberStack";

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

function BalanceIcon({ tone }) {
  const theme = useTheme();
  const Icon = tone === "negative" ? TrendingDown : TrendingUp;
  const color =
    tone === "negative" ? theme.semantic.negative : theme.semantic.positive;

  if (tone === "settled") {
    return null;
  }

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: theme.groupsScreen.iconTileDangerBackground,
        borderRadius: theme.radii.md,
        height: theme.sizes.iconButton,
        justifyContent: "center",
        width: theme.sizes.iconButton,
      }}
    >
      <Icon
        color={color}
        size={theme.space[5]}
        strokeWidth={theme.borderWidths.medium}
      />
    </View>
  );
}

function MetaItem({ icon: Icon, children }) {
  const theme = useTheme();

  return (
    <View style={[styles.metaItem, { gap: theme.space[1] }]}>
      <Icon
        color={theme.groupsScreen.metaText}
        size={theme.space[4]}
        strokeWidth={theme.borderWidths.medium}
      />
      <Text variant="body" color={theme.groupsScreen.metaText} numberOfLines={1}>
        {children}
      </Text>
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
  const position = getPositionCopy(group);
  const balanceTone =
    group.balanceTone === "settled" ? "positive" : group.balanceTone;
  const progressTone =
    group.balanceTone === "negative" ? "negative" : "positive";
  const palette = theme.groupsScreen;

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
      <Card
        variant="plain"
        style={{
          backgroundColor: palette.cardBackground,
          borderRadius: theme.radii.xl,
        }}
      >
        <View style={styles.cardTop}>
          <View style={{ flex: 1, gap: theme.space[1] }}>
            <Text variant="cardTitle" color="text" numberOfLines={1}>
              {group.name}
            </Text>
            <View style={[styles.metaRow, { gap: theme.space[3] }]}>
              <MetaItem icon={Users}>{group.memberCount} members</MetaItem>
              <MetaItem icon={ReceiptText}>{group.activityCount}</MetaItem>
            </View>
          </View>
          <Badge
            label={group.category}
            tone={group.categoryTone}
            style={{ minHeight: 28, paddingHorizontal: theme.space[3] }}
          />
        </View>

        <Divider
          color={palette.cardDivider}
          style={{ marginVertical: theme.space[4] }}
        />

        <View style={{ gap: theme.space[2] }}>
          <Text variant="field" color={palette.metaText} uppercase>
            Latest expense
          </Text>
          <View style={styles.latestRow}>
            <Text
              variant="field"
              color="text"
              numberOfLines={1}
              style={styles.latestText}
            >
              {group.latestExpenseDetail || group.latestExpense}
            </Text>
            <View style={[styles.time, { gap: theme.space[1] }]}>
              <Clock3
                color={palette.metaText}
                size={theme.space[4]}
                strokeWidth={theme.borderWidths.medium}
              />
              <Text variant="label" color={palette.metaText} numberOfLines={1}>
                {group.updatedAt}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.cardBottom, { marginTop: theme.space[4] }]}>
          <View style={{ flex: 1, gap: theme.space[2] }}>
            <View style={[styles.balanceTextRow, { gap: theme.space[2] }]}>
              <BalanceIcon tone={group.balanceTone} />
              <View style={styles.positionText}>
                <Text variant="cardAmount" color={progressTone} numberOfLines={1}>
                  {position.amount}
                </Text>
                <Text variant="body" color={palette.metaText} numberOfLines={1}>
                  {position.label}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.trailing, { gap: theme.space[2] }]}>
            <MemberStack
              members={group.members}
              count={group.memberCount}
              palettes={palette.memberColors}
            />
            <View
              style={{
                alignItems: "center",
                backgroundColor: palette.chevronBackground,
                borderColor: palette.chevronBorder,
                borderRadius: theme.radii.full,
                borderWidth: theme.borderWidths.hairline,
                height: theme.sizes.iconButton,
                justifyContent: "center",
                width: theme.sizes.iconButton,
              }}
            >
              <ChevronRight
                color={palette.metaText}
                size={theme.space[5]}
                strokeWidth={theme.borderWidths.medium}
              />
            </View>
          </View>
        </View>
        <ProgressBar
          value={group.settlementProgress}
          max={1}
          tone={balanceTone}
          height={theme.space[2]}
          style={{
            backgroundColor: theme.semantic.inactive,
            marginTop: theme.space[4],
          }}
        />
      </Card>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  balanceTextRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  cardTop: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBottom: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
  positionText: {
    flex: 1,
  },
  time: {
    alignItems: "center",
    flexDirection: "row",
  },
  trailing: {
    alignItems: "center",
    flexDirection: "row",
  },
});
