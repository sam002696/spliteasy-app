import React, { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, useTheme } from "../../design-system";
import {
  CreateGroupFab,
  FilterChips,
  GroupsHeader,
  GroupsList,
  GroupsSummary,
} from "./components";
import { groupFilters, groups, groupStats } from "./data/groupsData";

function GroupsIntro({ activeFilter, onCreateGroup, onFilterChange }) {
  return (
    <>
      <GroupsHeader onCreateGroup={onCreateGroup} />
      <GroupsSummary stats={groupStats} />
      <FilterChips filters={groupFilters} value={activeFilter} onChange={onFilterChange} />
    </>
  );
}

export function GroupsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const visibleGroups = useMemo(() => {
    if (activeFilter === "all") {
      return groups;
    }

    return groups.filter((group) => group.balanceTone === activeFilter);
  }, [activeFilter]);
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
        onOpenGroup={handleOpenGroup}
        ListHeaderComponent={
          <GroupsIntro
            activeFilter={activeFilter}
            onCreateGroup={handleCreateGroup}
            onFilterChange={setActiveFilter}
          />
        }
      />
      <CreateGroupFab onPress={handleCreateGroup} />
    </SafeAreaView>
  );
}
