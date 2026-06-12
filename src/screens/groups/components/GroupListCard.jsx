import React, { useEffect } from "react";
import {
  ChevronRight,
  Clock3,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
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
import { MemberStack } from "./MemberStack";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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

function getPositionCopy(group) {
  if (group.positionLabel) {
    return { label: group.positionLabel, amount: group.balance };
  }

  if (group.balanceTone === "settled") {
    return { label: "All settled", amount: "৳ 0" };
  }

  if (group.balanceTone === "negative") {
    return { label: "You owe", amount: group.balance.replace(/^-\s*/, "") };
  }

  return { label: "You are owed", amount: group.balance.replace(/^\+\s*/, "") };
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

export function GroupListCard({ group, index, onPress }) {
  const theme = useTheme();
  const palette = theme.groupsScreen;
  const pressed = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(theme.space[4]);
  const balanceTone =
    group.balanceTone === "settled" ? "positive" : group.balanceTone;
  const balanceColor =
    group.balanceTone === "negative" ? "negative" : "positive";
  const position = getPositionCopy(group);

  useEffect(() => {
    const delay = theme.motion.fast + index * (theme.motion.fast / 2);
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: theme.motion.spring }),
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: theme.motion.spring }),
    );
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
      <Card
        variant="plain"
        style={{
          backgroundColor: palette.cardBackground,
          borderRadius: theme.radii.xl,
        }}
      >
        <View style={styles.topRow}>
          <View style={{ flex: 1, gap: theme.space[1] }}>
            <Text variant="sectionTitle" color="text" numberOfLines={1}>
              {group.name}
            </Text>
            <View style={[styles.metaRow, { gap: theme.space[3] }]}>
              <MetaItem icon={Users}>{group.memberCount} members</MetaItem>
              <MetaItem icon={ReceiptText}>{group.activityCount}</MetaItem>
            </View>
          </View>
          <Badge label={group.category} tone={group.categoryTone} />
        </View>

        <Divider
          color={palette.cardDivider}
          style={{ marginVertical: theme.space[5] }}
        />

        <View style={{ gap: theme.space[2] }}>
          <Text variant="field" color={palette.metaText} uppercase>
            Latest expense
          </Text>
          <View style={styles.latestRow}>
            <Text
              variant="cardTitle"
              color="text"
              numberOfLines={1}
              style={styles.latestText}
            >
              {group.latestExpense}
            </Text>
            <View style={[styles.time, { gap: theme.space[1] }]}>
              <Clock3
                color={palette.metaText}
                size={theme.space[4]}
                strokeWidth={theme.borderWidths.medium}
              />
              <Text variant="body" color={palette.metaText} numberOfLines={1}>
                {group.updatedAt}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.balanceRow, { marginTop: theme.space[5] }]}>
          <View style={{ flex: 1, gap: theme.space[2] }}>
            <View style={[styles.balanceTextRow, { gap: theme.space[2] }]}>
              <BalanceIcon tone={group.balanceTone} />
              <View style={styles.positionText}>
                <Text
                  variant="cardAmount"
                  color={balanceColor}
                  numberOfLines={1}
                >
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
            marginTop: theme.space[5],
          }}
        />
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
  positionText: {
    flex: 1,
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
  trailing: {
    alignItems: "center",
    flexDirection: "row",
  },
});
