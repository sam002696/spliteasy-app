import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  fetchGroups,
  groupFilters as apiGroupFilters,
  selectGroups,
  selectGroupsState,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { FilterChips, GroupsHeader, GroupsList } from "./components";
import { groupFilters } from "./data/groupsData";
import { mapApiGroupToListItem } from "./utils";

function GroupsIntro({ activeFilter, onCreateGroup, onFilterChange }) {
  return (
    <>
      <GroupsHeader onCreateGroup={onCreateGroup} />
      <FilterChips
        filters={groupFilters}
        value={activeFilter}
        onChange={onFilterChange}
      />
    </>
  );
}

export function GroupsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectGroupsState);
  const groups = useAppSelector(selectGroups);
  const [activeFilter, setActiveFilter] = useState(apiGroupFilters.all);
  const visibleGroups = useMemo(
    () => groups.map(mapApiGroupToListItem),
    [groups],
  );

  useEffect(() => {
    dispatch(fetchGroups(activeFilter));
  }, [activeFilter, dispatch]);

  const refreshGroups = useCallback(() => {
    dispatch(fetchGroups(activeFilter));
  }, [activeFilter, dispatch]);

  const handleCreateGroup = () => {
    router.push("/create-group");
  };

  const handleOpenGroup = (groupId) => {
    router.push({
      pathname: "/groups/[groupId]",
      params: { groupId },
    });
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: theme.semantic.background,
        flex: 1,
      }}
    >
      <GroupsList
        groups={visibleGroups}
        isLoading={loading.list && visibleGroups.length === 0}
        onOpenGroup={handleOpenGroup}
        onRefresh={refreshGroups}
        refreshing={loading.list && visibleGroups.length > 0}
        ListHeaderComponent={
          <GroupsIntro
            activeFilter={activeFilter}
            onCreateGroup={handleCreateGroup}
            onFilterChange={setActiveFilter}
          />
        }
      />
    </SafeAreaView>
  );
}
