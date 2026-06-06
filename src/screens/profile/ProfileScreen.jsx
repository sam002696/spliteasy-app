import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { AppState, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  logout,
  selectAuth,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import {
  // ProfileFooter,
  ProfileHeader,
  ProfileIdentityCard,
  SettingsSection,
} from "./components";
import { accountRows, profileActions, settingsRows } from "./data/profileData";
import {
  disableExpoPushNotifications,
  enableExpoPushNotifications,
  getExpoPushNotificationStatus,
} from "../../services/push/expoNotifications";

function getPushStatusLabel({ isLoading, permissionStatus, preferenceEnabled }) {
  if (isLoading) {
    return "Updating...";
  }

  if (!preferenceEnabled) {
    return "Push disabled";
  }

  if (permissionStatus === "granted") {
    return "Push enabled";
  }

  if (permissionStatus === "denied") {
    return "Permission denied";
  }

  return "Permission required";
}

export function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectAuth);
  const [pushStatus, setPushStatus] = useState({
    permissionStatus: "undetermined",
    preferenceEnabled: true,
    pushEnabled: false,
  });
  const [isPushUpdating, setIsPushUpdating] = useState(false);

  const refreshPushStatus = useCallback(async () => {
    try {
      const status = await getExpoPushNotificationStatus();
      setPushStatus(status);
    } catch {
      setPushStatus((currentStatus) => ({
        ...currentStatus,
        permissionStatus: "unavailable",
      }));
    }
  }, []);

  useEffect(() => {
    refreshPushStatus();
  }, [refreshPushStatus]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        refreshPushStatus();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [refreshPushStatus]);

  const handlePushToggle = useCallback(
    async (nextValue) => {
      setIsPushUpdating(true);

      try {
        const status = nextValue
          ? await enableExpoPushNotifications()
          : await disableExpoPushNotifications();

        setPushStatus((currentStatus) => ({
          ...currentStatus,
          ...status,
          preferenceEnabled: nextValue,
          pushEnabled:
            nextValue && (status?.permissionStatus || currentStatus.permissionStatus) === "granted",
        }));
      } finally {
        setIsPushUpdating(false);
      }
    },
    [],
  );

  const profileSettingsRows = useMemo(
    () =>
      settingsRows.map((row) =>
        row.id === "notifications"
          ? {
              ...row,
              control: "switch",
              onValueChange: handlePushToggle,
              value: getPushStatusLabel({
                isLoading: isPushUpdating,
                permissionStatus: pushStatus.permissionStatus,
                preferenceEnabled: pushStatus.preferenceEnabled,
              }),
              valueEnabled: pushStatus.preferenceEnabled,
            }
          : row,
      ),
    [handlePushToggle, isPushUpdating, pushStatus],
  );
  const accountSettingsRows = useMemo(
    () =>
      accountRows.map((row) =>
        row.id === "sign-out" && loading.logout
          ? { ...row, value: "Signing out..." }
          : row,
      ),
    [loading.logout],
  );

  const handleSignOut = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
      router.replace("/login");
    } catch {
      // The auth slice still clears local session state when logout fails.
      // AuthGate will move the user back to login if the token was cleared.
    }
  }, [dispatch, router]);

  const handleAccountRowPress = useCallback(
    (row) => {
      if (row.id === "sign-out" && !loading.logout) {
        handleSignOut();
      }
    },
    [handleSignOut, loading.logout],
  );

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: theme.semantic.background,
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: theme.space[4],
          paddingBottom: theme.space[8],
        }}
      >
        <ProfileHeader />
        <ProfileIdentityCard />
        {/* <SettingsSection
          title="Profile"
          rows={profileActions}
          delay={theme.motion.normal}
        /> */}
        <SettingsSection
          title="Settings"
          rows={profileSettingsRows}
          delay={theme.motion.spring}
          disabledRowId={isPushUpdating ? "notifications" : undefined}
        />
        <SettingsSection
          title="Account"
          rows={accountSettingsRows}
          delay={theme.motion.screen}
          disabledRowId={loading.logout ? "sign-out" : undefined}
          onRowPress={handleAccountRowPress}
        />
        {/* <ProfileFooter /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
