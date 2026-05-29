import React, { useCallback, useMemo } from "react";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  logout,
  selectAuth,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import {
  ProfileFooter,
  ProfileHeader,
  ProfileIdentityCard,
  SettingsSection,
} from "./components";
import {
  accountRows,
  profileActions,
  profileUser,
  settingsRows,
} from "./data/profileData";

export function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectAuth);
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
        <ProfileIdentityCard user={profileUser} />
        <SettingsSection
          title="Profile"
          rows={profileActions}
          delay={theme.motion.normal}
        />
        <SettingsSection
          title="Settings"
          rows={settingsRows}
          delay={theme.motion.spring}
        />
        <SettingsSection
          title="Account"
          rows={accountSettingsRows}
          delay={theme.motion.screen}
          disabledRowId={loading.logout ? "sign-out" : undefined}
          onRowPress={handleAccountRowPress}
        />
        <ProfileFooter />
      </ScrollView>
    </SafeAreaView>
  );
}
