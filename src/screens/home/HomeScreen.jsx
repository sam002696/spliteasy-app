import React, { useCallback } from "react";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  ActiveGroupsSection,
  ActivityItem,
  FadeInView,
  Greeting,
  HeroCard,
  RecentActivitySection,
  TopBar,
} from "./components";
import { activeGroups, homeSummary, recentActivity } from "./data/homeData";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function HomeHeader({ onOpenGroup }) {
  return (
    <>
      <TopBar />
      <Greeting name="Sami" />
      <HeroCard summary={homeSummary} />
      <ActiveGroupsSection groups={activeGroups} onOpenGroup={onOpenGroup} />
      <RecentActivitySection />
    </>
  );
}

export function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const openGroup = useCallback(
    (groupId) => {
      router.push({
        pathname: "/groups/[groupId]",
        params: { groupId },
      });
    },
    [router],
  );

  const renderActivity = useCallback(
    ({ item, index }) => (
      <FadeInView delay={theme.motion.screen + index * (theme.motion.fast / 2)}>
        <ActivityItem activity={item} />
      </FadeInView>
    ),
    [theme.motion.fast, theme.motion.screen],
  );

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.safeArea,
        {
          backgroundColor: theme.semantic.background,
        },
      ]}
    >
      <AnimatedFlatList
        data={recentActivity}
        keyExtractor={(item) => item.id}
        renderItem={renderActivity}
        ListHeaderComponent={<HomeHeader onOpenGroup={openGroup} />}
        ListFooterComponent={<View style={{ height: theme.space[6] }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: theme.space[4],
          paddingTop: theme.space[2],
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
