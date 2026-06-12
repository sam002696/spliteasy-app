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
  QuickActionsSection,
  RecentActivitySection,
  TopBar,
} from "./components";
import {
  mapHomeActivity,
  mapHomeGroup,
  mapHomeSummary,
} from "./utils";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function HomeHeader({
  activeGroupsCount,
  groups,
  hasRecentActivity,
  onAddExpense,
  onQuickAction,
  onCreateGroup,
  onOpenBalances,
  onOpenGroup,
  summary,
}) {
  return (
    <>
      <TopBar />
      <HeroCard
        summary={summary}
        onAddExpense={onAddExpense}
        onOpenBalances={onOpenBalances}
      />
      <QuickActionsSection onActionPress={onQuickAction} />
      <ActiveGroupsSection
        activeCount={activeGroupsCount}
        groups={groups}
        onCreateGroup={onCreateGroup}
        onOpenGroup={onOpenGroup}
      />
      {hasRecentActivity ? <RecentActivitySection /> : null}
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

  const addExpense = useCallback(() => {
    router.push("/add-expense");
  }, [router]);

  const openBalances = useCallback(() => {
    router.push("/balances");
  }, [router]);

  const inviteMember = useCallback(() => {
    if (mappedGroups.length === 1) {
      router.push({
        pathname: "/groups/[groupId]",
        params: { groupId: mappedGroups[0].id },
      });
      return;
    }

    router.push("/groups");
  }, [mappedGroups, router]);

  const handleQuickAction = useCallback(
    (actionId) => {
      const handlers = {
        addExpense,
        createGroup,
        inviteMember,
        settleUp: openBalances,
      };

      handlers[actionId]?.();
    },
    [addExpense, createGroup, inviteMember, openBalances],
  );

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
        <ActivityItem
          activity={item}
          isLast={index === mappedActivities.length - 1}
        />
      </FadeInView>
    ),
    [mappedActivities.length, theme.motion.fast, theme.motion.screen],
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
            hasRecentActivity={mappedActivities.length > 0}
            onAddExpense={addExpense}
            onCreateGroup={createGroup}
            onOpenBalances={openBalances}
            onOpenGroup={openGroup}
            onQuickAction={handleQuickAction}
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
