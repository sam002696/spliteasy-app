import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  ProfileFooter,
  ProfileHeader,
  ProfileIdentityCard,
  SettingsSection,
} from "./components";
import { accountRows, profileActions, profileUser, settingsRows } from "./data/profileData";

export function ProfileScreen() {
  const theme = useTheme();

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
        <SettingsSection title="Profile" rows={profileActions} delay={theme.motion.normal} />
        <SettingsSection title="Settings" rows={settingsRows} delay={theme.motion.spring} />
        <SettingsSection title="Account" rows={accountRows} delay={theme.motion.screen} />
        <ProfileFooter />
      </ScrollView>
    </SafeAreaView>
  );
}
