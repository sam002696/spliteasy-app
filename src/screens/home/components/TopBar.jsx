import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { BellDot, UserPlus } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Avatar, Text, useTheme } from "../../../design-system";
import {
  fetchPendingInvitations,
  fetchNotifications,
  notificationFilters,
  selectCurrentUser,
  selectIsAuthenticated,
  selectPendingInvitationsCount,
  selectUnreadNotificationsCount,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { getGreeting } from "../utils";
import { FadeInView } from "./FadeInView";

function TopBarActionButton({ count = 0, icon: Icon, label, onPress }) {
  const theme = useTheme();
  const palette = theme.homeTopBar;
  const showBadge = count > 0;
  const badgeLabel = count > 9 ? "9+" : String(count);
  const isCompactBadge = badgeLabel.length === 1;
  const badgeSize = theme.space[6];

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      hitSlop={theme.space[2]}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        {
          backgroundColor: palette.actionBackground,
          borderRadius: theme.radii.full,
          height: theme.sizes.avatarMd,
          opacity: pressed ? 0.78 : 1,
          width: theme.sizes.avatarMd,
        },
      ]}
    >
      <Icon
        color={palette.actionIcon}
        size={theme.space[5]}
        strokeWidth={theme.borderWidths.medium}
      />
      {showBadge ? (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: theme.semantic.danger,
              borderColor: theme.semantic.background,
              borderRadius: theme.radii.full,
              height: badgeSize,
              minWidth: badgeSize,
              paddingHorizontal: isCompactBadge ? 0 : theme.space[1],
            },
          ]}
        >
          <Text variant="micro" color="white" style={styles.badgeText}>
            {badgeLabel}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export function TopBar() {
  const theme = useTheme();
  const palette = theme.homeTopBar;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const pendingInvitationsCount = useAppSelector(selectPendingInvitationsCount);
  const unreadNotificationsCount = useAppSelector(
    selectUnreadNotificationsCount,
  );
  const displayName = currentUser?.name || currentUser?.email || "there";
  const greeting = getGreeting();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    dispatch(fetchPendingInvitations());
    dispatch(fetchNotifications({ filter: notificationFilters.all }));
  }, [dispatch, isAuthenticated]);

  return (
    <FadeInView delay={0}>
      <View style={[styles.root, { marginBottom: theme.space[4] }]}>
        <View style={[styles.identity, { gap: theme.space[3] }]}>
          <Avatar
            name={displayName}
            textColor={palette.avatarText}
            textStyle={{
              fontFamily: theme.fontFamilies.bodyBold,
              fontSize: theme.typography.field.fontSize,
              lineHeight: theme.typography.field.lineHeight,
            }}
            style={{
              backgroundColor: palette.avatarBackground,
            }}
          />
          <View>
            <Text variant="label" color="textMuted" style={styles.greeting}>
              {greeting},
            </Text>
            <Text variant="cardTitle" color="text" numberOfLines={1}>
              {displayName}
            </Text>
          </View>
        </View>
        <View style={[styles.actions, { gap: theme.space[2] }]}>
          <TopBarActionButton
            count={pendingInvitationsCount}
            icon={UserPlus}
            color={theme.semantic.secondaryAccent}
            label="Group requests"
            onPress={() => router.push("/group-requests")}
          />
          <TopBarActionButton
            count={unreadNotificationsCount}
            icon={BellDot}
            label="Notifications"
            onPress={() => router.push("/notifications")}
          />
        </View>
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    alignItems: "center",
    flexDirection: "row",
  },
  badge: {
    alignItems: "center",
    borderWidth: 2,
    justifyContent: "center",
    position: "absolute",
    right: -4,
    top: -4,
  },
  badgeText: {
    textAlign: "center",
  },
  root: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  greeting: {
    marginBottom: -2,
  },
  identity: {
    alignItems: "center",
    flexDirection: "row",
  },
});
