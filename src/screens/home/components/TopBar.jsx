import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { BellDot, UserPlus } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Avatar, Text, useTheme } from "../../../design-system";
import {
  fetchPendingInvitations,
  selectCurrentUser,
  selectPendingInvitationsCount,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { getGreeting } from "../utils";
import { FadeInView } from "./FadeInView";

function TopBarActionButton({ count = 0, icon: Icon, label, onPress }) {
  const theme = useTheme();
  const showBadge = count > 0;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      hitSlop={theme.space[2]}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        {
          backgroundColor: theme.semantic.surfaceStrong,
          borderRadius: theme.radii.full,
          height: theme.sizes.iconButton,
          opacity: pressed ? 0.78 : 1,
          width: theme.sizes.iconButton,
        },
      ]}
    >
      <Icon
        color={theme.semantic.accent}
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
              minWidth: theme.space[5],
            },
          ]}
        >
          <Text variant="micro" color="white">
            {count > 9 ? "9+" : count}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export function TopBar() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const pendingInvitationsCount = useAppSelector(selectPendingInvitationsCount);
  const displayName = currentUser?.name || currentUser?.email || "there";
  const greeting = getGreeting();

  useEffect(() => {
    dispatch(fetchPendingInvitations());
  }, [dispatch]);

  return (
    <FadeInView delay={0}>
      <View style={[styles.root, { marginBottom: theme.space[4] }]}>
        <View style={[styles.identity, { gap: theme.space[3] }]}>
          <Avatar name={displayName} />
          <View>
            <Text variant="label" color="textMuted">
              {greeting},
            </Text>
            <Text variant="cardTitle" color="text">
              {displayName}
            </Text>
          </View>
        </View>
        <View style={[styles.actions, { gap: theme.space[2] }]}>
          <TopBarActionButton
            count={pendingInvitationsCount}
            icon={UserPlus}
            label="Group requests"
            onPress={() => router.push("/group-requests")}
          />
          <TopBarActionButton icon={BellDot} label="Notifications" />
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
    minHeight: 20,
    paddingHorizontal: 4,
    position: "absolute",
    right: -4,
    top: -4,
  },
  root: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  identity: {
    alignItems: "center",
    flexDirection: "row",
  },
});
