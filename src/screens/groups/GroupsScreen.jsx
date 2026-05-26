import React, { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import { FilterChips, GroupsHeader, GroupsList } from "./components";
import { groupFilters, groups } from "./data/groupsData";

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
    </SafeAreaView>
  );
}
