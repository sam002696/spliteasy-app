import React, { useEffect } from "react";
import { ArrowDown, ArrowUp, FileText } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
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
  Button,
  Card,
  Divider,
  ProgressBar,
  Text,
  useTheme,
} from "../../../design-system";
import { getBalanceActionPresentation } from "../../../utils";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function StatusBadge({ isDebt }) {
  const theme = useTheme();
  const palette = theme.balancesScreen;
  const Icon = isDebt ? ArrowUp : ArrowDown;
  const backgroundColor = isDebt
    ? palette.debtBadgeBackground
    : palette.creditBadgeBackground;
  const color = isDebt ? palette.debtBadgeText : palette.creditBadgeText;
  const label = isDebt ? "You owe" : "Owed to you";

  return (
    <View
      style={[
        styles.statusBadge,
        {
          backgroundColor,
          borderRadius: theme.radii.full,
          gap: theme.space[1],
          paddingHorizontal: theme.space[2],
          paddingVertical: theme.space[1],
        },
      ]}
    >
      <Icon
        color={color}
        size={theme.space[3]}
        strokeWidth={theme.borderWidths.medium}
      />
      <Text variant="micro" color={color} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

function ExpenseIconTile() {
  const theme = useTheme();
  const palette = theme.balancesScreen;

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: palette.expenseIconBackground,
        borderRadius: theme.radii.md,
        height: theme.sizes.iconButton,
        justifyContent: "center",
        width: theme.sizes.iconButton,
      }}
    >
      <FileText
        color={palette.expenseIcon}
        size={theme.space[5]}
        strokeWidth={theme.borderWidths.medium}
      />
    </View>
  );
}

export function OpenBalanceCard({
  actionLoading = false,
  balance,
  index = 0,
  onActionPress,
}) {
  const theme = useTheme();
  const palette = theme.balancesScreen;
  const pressed = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(theme.space[3]);
  const isDebt = balance.tone === "negative";
  const actionPresentation = getBalanceActionPresentation(
    balance.tone,
    palette,
  );
  const ActionIcon = actionPresentation.Icon;
  const progressPercent = Math.round(balance.progress * 100);

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
        <View style={[styles.header, { gap: theme.space[3] }]}>
          <Avatar
            name={balance.person}
            size="md"
            textColor={theme.colors.white}
            style={{ backgroundColor: palette.avatarBackground }}
            textStyle={theme.typography.field}
          />
          <View style={{ flex: 1, gap: theme.space[1] }}>
            <Text variant="cardTitle" color="text" numberOfLines={1}>
              {balance.person}
            </Text>
            <View style={[styles.groupRow, { gap: theme.space[2] }]}>
              <Text
                variant="body"
                color={palette.metaText}
                numberOfLines={1}
                style={styles.groupName}
              >
                {balance.group}
              </Text>
              <Badge label={balance.category} tone={balance.categoryTone} />
            </View>
          </View>
          <View style={[styles.amount, { gap: theme.space[2] }]}>
            <Text variant="sectionTitle" color={balance.tone} numberOfLines={1}>
              {balance.amount}
            </Text>
            <StatusBadge isDebt={isDebt} />
          </View>
        </View>

        <Divider
          color={palette.cardDivider}
          style={{ marginVertical: theme.space[5] }}
        />

        <View style={[styles.expenseRow, { gap: theme.space[3] }]}>
          <ExpenseIconTile />
          <View style={{ flex: 1, gap: theme.space[1] }}>
            <Text variant="field" color={palette.metaText} uppercase>
              Latest expense
            </Text>
            <Text variant="cardTitle" color="text" numberOfLines={1}>
              {balance.lastActivityDetail}
            </Text>
          </View>
          <Text
            variant="field"
            color={isDebt ? "danger" : "positive"}
            numberOfLines={1}
          >
            {progressPercent}% settled
          </Text>
        </View>

        <View style={{ marginTop: theme.space[3] }}>
          <ProgressBar
            value={balance.progress}
            max={1}
            tone={balance.tone}
            height={theme.space[2]}
            style={{ backgroundColor: theme.semantic.inactive }}
          />
          <View style={{ marginTop: theme.space[5] }}>
            <Button
              title={balance.action}
              variant="danger"
              size="md"
              fullWidth
              loading={actionLoading}
              onPress={() => onActionPress?.(balance)}
              style={{
                backgroundColor: actionPresentation.backgroundColor,
                borderColor: actionPresentation.backgroundColor,
              }}
              textStyle={{ color: actionPresentation.color }}
              left={
                <ActionIcon
                  color={actionPresentation.color}
                  size={theme.space[5]}
                  strokeWidth={theme.borderWidths.medium}
                />
              }
            />
          </View>
        </View>
      </Card>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  amount: {
    alignItems: "flex-end",
  },
  expenseRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  groupName: {
    flexShrink: 1,
  },
  groupRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  statusBadge: {
    alignItems: "center",
    flexDirection: "row",
  },
});
