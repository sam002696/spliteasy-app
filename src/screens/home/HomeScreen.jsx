import React, { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  fetchHomeDashboard,
  selectIsAuthenticated,
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
  HomeEmptyState,
  RecentActivitySection,
  TopBar,
} from "./components";
import {
  mapHomeActivity,
  mapHomeGroup,
  mapHomeSummary,
} from "./utils";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const noRecentActivityImage = require("../../../assets/remy/no_recent_activity.png");

function EmptyActivity() {
  return (
    <HomeEmptyState
      image={noRecentActivityImage}
      title="No recent activity"
      body="New expenses, settlements, and group updates will appear here."
    />
  );
}

function HomeHeader({
  activeGroupsCount,
  groups,
  onCreateGroup,
  onOpenGroup,
  summary,
}) {
  return (
    <>
      <TopBar />
      <HeroCard summary={summary} />
      <ActiveGroupsSection
        activeCount={activeGroupsCount}
        groups={groups}
        onCreateGroup={onCreateGroup}
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
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
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
      if (!isAuthenticated) {
        return undefined;
      }

      dispatch(fetchHomeDashboard());
      return undefined;
    }, [dispatch, isAuthenticated]),
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

  const createGroup = useCallback(() => {
    router.push("/create-group");
  }, [router]);

  const refreshHome = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    setIsRefreshing(true);

    try {
      await dispatch(fetchHomeDashboard());
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch, isAuthenticated]);

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
        ListEmptyComponent={<EmptyActivity />}
        ListHeaderComponent={
          <HomeHeader
            activeGroupsCount={activeGroupsCount}
            groups={mappedGroups}
            onCreateGroup={createGroup}
            onOpenGroup={openGroup}
            summary={mappedSummary}
          />
        }
        ListFooterComponent={<View style={{ height: theme.space[8] * 4 }} />}
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
