import React, { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  fetchHomeDashboard,
  selectHomeActiveGroups,
  selectHomeActiveGroupsCount,
  selectHomeRecentActivities,
  selectHomeSummary,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import {
  ActiveGroupsSection,
  ActivityItem,
  FadeInView,
  HeroCard,
  RecentActivitySection,
  TopBar,
} from "./components";
import {
  mapHomeActivity,
  mapHomeGroup,
  mapHomeSummary,
} from "./utils";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function HomeHeader({ activeGroupsCount, groups, onOpenGroup, summary }) {
  return (
    <>
      <TopBar />
      <HeroCard summary={summary} />
      <ActiveGroupsSection
        activeCount={activeGroupsCount}
        groups={groups}
        onOpenGroup={onOpenGroup}
      />
      <RecentActivitySection />
    </>
  );
}

export function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const summary = useAppSelector(selectHomeSummary);
  const activeGroupsCount = useAppSelector(selectHomeActiveGroupsCount);
  const activeGroups = useAppSelector(selectHomeActiveGroups);
  const recentActivities = useAppSelector(selectHomeRecentActivities);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const mappedSummary = useMemo(() => mapHomeSummary(summary), [summary]);
  const mappedGroups = useMemo(
    () => activeGroups.map(mapHomeGroup),
    [activeGroups],
  );
  const mappedActivities = useMemo(
    () => recentActivities.map(mapHomeActivity),
    [recentActivities],
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchHomeDashboard());
    }, [dispatch]),
  );

  const openGroup = useCallback(
    (groupId) => {
      router.push({
        pathname: "/groups/[groupId]",
        params: { groupId },
      });
    },
    [router],
  );

  const refreshHome = useCallback(async () => {
    setIsRefreshing(true);

    try {
      await dispatch(fetchHomeDashboard());
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch]);

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
        data={mappedActivities}
        keyExtractor={(item) => item.id}
        renderItem={renderActivity}
        ListHeaderComponent={
          <HomeHeader
            activeGroupsCount={activeGroupsCount}
            groups={mappedGroups}
            onOpenGroup={openGroup}
            summary={mappedSummary}
          />
        }
        ListFooterComponent={<View style={{ height: theme.space[6] }} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshHome}
            tintColor={theme.semantic.text}
          />
        }
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
