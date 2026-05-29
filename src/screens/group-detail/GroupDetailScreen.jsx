import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, useTheme } from "../../design-system";
import {
  fetchGroup,
  fetchGroupBalances,
  fetchGroupExpenses,
  fetchGroupMembers,
  selectExpensesByGroup,
  selectGroupBalances,
  selectGroupMembers,
  selectGroupsState,
  selectSelectedGroup,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import {
  AddExpenseFab,
  BalancesPanel,
  ExpensesPanel,
  GroupDetailHeader,
  GroupSummaryCard,
  GroupTabSwitcher,
  MembersPanel,
} from "./components";
import { groupDetailTabs } from "./data/groupDetailData";
import { mapGroupDetail } from "./utils";

function ActivePanel({ group, tab }) {
  if (tab === "balances") {
    return <BalancesPanel balances={group.balances} />;
  }

  if (tab === "members") {
    return <MembersPanel members={group.members} />;
  }

  return <ExpensesPanel expenses={group.expenses} />;
}

export function GroupDetailScreen({ groupId }) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const normalizedGroupId = String(groupId);
  const selectedGroup = useAppSelector(selectSelectedGroup);
  const members = useAppSelector(selectGroupMembers(normalizedGroupId));
  const balancesData = useAppSelector(selectGroupBalances(normalizedGroupId));
  const expenses = useAppSelector(selectExpensesByGroup(normalizedGroupId));
  const { loading } = useAppSelector(selectGroupsState);
  const [activeTab, setActiveTab] = useState("expenses");
  const [hasRequestedGroup, setHasRequestedGroup] = useState(false);
  const hasGroup = selectedGroup && String(selectedGroup.id) === normalizedGroupId;
  const group = useMemo(() => {
    if (!hasGroup) {
      return null;
    }

    return mapGroupDetail({
      balancesData,
      expenses,
      group: selectedGroup,
      members,
    });
  }, [balancesData, expenses, hasGroup, members, selectedGroup]);

  useEffect(() => {
    if (!groupId) {
      return;
    }

    setHasRequestedGroup(true);
    dispatch(fetchGroup(normalizedGroupId));
    dispatch(fetchGroupExpenses(normalizedGroupId));
    dispatch(fetchGroupMembers(normalizedGroupId));
    dispatch(fetchGroupBalances(normalizedGroupId));
  }, [dispatch, groupId, normalizedGroupId]);

  const openAddExpense = () => {
    router.push({
      pathname: "/add-expense",
      params: { groupId: normalizedGroupId },
    });
  };

  const isLoading = !hasRequestedGroup || (loading.detail && !group);

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
          flexGrow: 1,
          padding: theme.space[4],
          paddingBottom: theme.space[8] * 4,
        }}
      >
        {isLoading ? (
          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              paddingVertical: theme.space[8],
            }}
          >
            <ActivityIndicator color={theme.semantic.text} />
          </View>
        ) : null}

        {!isLoading && !group ? (
          <View
            style={{
              alignItems: "center",
              flex: 1,
              gap: theme.space[2],
              justifyContent: "center",
              paddingVertical: theme.space[8],
            }}
          >
            <Text variant="sectionTitle" color="text">
              Group not found
            </Text>
            <Text variant="bodySmall" color="textMuted" align="center">
              Go back and try opening the group again.
            </Text>
          </View>
        ) : null}

        {group ? (
          <>
            <GroupDetailHeader group={group} onBack={() => router.back()} />
            <GroupSummaryCard summary={group.summary} />
            <GroupTabSwitcher tabs={groupDetailTabs} value={activeTab} onChange={setActiveTab} />
            <ActivePanel group={group} tab={activeTab} />
          </>
        ) : null}
      </ScrollView>
      {group ? <AddExpenseFab onPress={openAddExpense} /> : null}
    </SafeAreaView>
  );
}
