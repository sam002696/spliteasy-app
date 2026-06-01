import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, useTheme } from "../../design-system";
import {
  deleteGroup,
  deleteExpense,
  fetchGroup,
  fetchGroupBalances,
  fetchGroupExpenses,
  fetchGroupMembers,
  fetchGroups,
  fetchHomeDashboard,
  inviteGroupMember,
  leaveGroup,
  remindBalance,
  removeGroupMember,
  selectActiveGroupFilter,
  selectCurrentUser,
  selectExpenses,
  selectExpensesByGroup,
  selectGroupBalances,
  selectGroupMembers,
  selectGroupsState,
  selectSelectedGroup,
  selectRemindingBalanceIds,
  selectSettlingBalanceIds,
  settleBalance,
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

function ActivePanel({
  deletingExpenseIds,
  group,
  invitingMember,
  onBalanceAction,
  onDeleteExpense,
  onDeleteMember,
  onInviteMember,
  removingMemberIds,
  settlingIds,
  tab,
}) {
  if (tab === "balances") {
    return (
      <BalancesPanel
        balances={group.balances}
        onBalanceAction={onBalanceAction}
        settlingIds={settlingIds}
      />
    );
  }

  if (tab === "members") {
    return (
      <MembersPanel
        inviting={invitingMember}
        members={group.members}
        onDeleteMember={onDeleteMember}
        onInviteMember={onInviteMember}
        removingMemberIds={removingMemberIds}
      />
    );
  }

  return (
    <ExpensesPanel
      deletingExpenseIds={deletingExpenseIds}
      expenses={group.expenses}
      onDeleteExpense={onDeleteExpense}
    />
  );
}

export function GroupDetailScreen({ groupId }) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const normalizedGroupId = String(groupId);
  const selectedGroup = useAppSelector(selectSelectedGroup);
  const activeGroupFilter = useAppSelector(selectActiveGroupFilter);
  const currentUser = useAppSelector(selectCurrentUser);
  const members = useAppSelector(selectGroupMembers(normalizedGroupId));
  const balancesData = useAppSelector(selectGroupBalances(normalizedGroupId));
  const expenses = useAppSelector(selectExpensesByGroup(normalizedGroupId));
  const { loading: expenseLoading } = useAppSelector(selectExpenses);
  const remindingIds = useAppSelector(selectRemindingBalanceIds);
  const settlingIds = useAppSelector(selectSettlingBalanceIds);
  const { loading } = useAppSelector(selectGroupsState);
  const [activeTab, setActiveTab] = useState("expenses");
  const [hasRequestedGroup, setHasRequestedGroup] = useState(false);
  const hasGroup =
    selectedGroup && String(selectedGroup.id) === normalizedGroupId;
  const isOwner =
    currentUser?.id &&
    String(selectedGroup?.owner_id) === String(currentUser.id);
  const group = useMemo(() => {
    if (!hasGroup) {
      return null;
    }

    return mapGroupDetail({
      balancesData,
      currentUserId: currentUser?.id,
      expenses,
      group: selectedGroup,
      members,
    });
  }, [
    balancesData,
    currentUser?.id,
    expenses,
    hasGroup,
    members,
    selectedGroup,
  ]);

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

  const inviteMember = async (email) => {
    const result = await dispatch(
      inviteGroupMember({
        email,
        groupId: normalizedGroupId,
      }),
    );

    if (inviteGroupMember.fulfilled.match(result)) {
      dispatch(fetchGroup(normalizedGroupId));
      dispatch(fetchGroupMembers(normalizedGroupId));
      dispatch(fetchGroupBalances(normalizedGroupId));
      return true;
    }

    return false;
  };

  const refreshGroupDetailData = () => {
    dispatch(fetchGroup(normalizedGroupId));
    dispatch(fetchGroupBalances(normalizedGroupId));
    dispatch(fetchGroupExpenses(normalizedGroupId));
    dispatch(fetchGroupMembers(normalizedGroupId));
    dispatch(fetchGroups(activeGroupFilter));
    dispatch(fetchHomeDashboard());
  };

  const removeMember = async (member) => {
    const result = await dispatch(
      removeGroupMember({
        groupId: normalizedGroupId,
        memberId: member.id,
      }),
    );

    if (removeGroupMember.fulfilled.match(result)) {
      refreshGroupDetailData();
    }
  };

  const removeExpense = async (expense) => {
    const result = await dispatch(
      deleteExpense({
        expenseId: expense.id,
        groupId: normalizedGroupId,
      }),
    );

    if (deleteExpense.fulfilled.match(result)) {
      refreshGroupDetailData();
    }
  };

  const settleGroupBalance = async (balance) => {
    if (balance.canRemind) {
      try {
        await dispatch(
          remindBalance({
            balanceId: balance.id,
            groupId: balance.groupId,
            userId: balance.userId,
          }),
        ).unwrap();
      } catch {
        return;
      }

      dispatch(fetchHomeDashboard());
      return;
    }

    if (balance.canSettle) {
      try {
        await dispatch(
          settleBalance({
            balanceId: balance.id,
            groupId: balance.groupId,
            userId: balance.userId,
          }),
        ).unwrap();
      } catch {
        return;
      }

      dispatch(fetchGroup(normalizedGroupId));
      dispatch(fetchGroupBalances(normalizedGroupId));
      dispatch(fetchGroupExpenses(normalizedGroupId));
      dispatch(fetchGroups(activeGroupFilter));
      dispatch(fetchHomeDashboard());
    }
  };

  const goToGroups = () => {
    router.replace("/groups");
  };

  const deleteCurrentGroup = async () => {
    const result = await dispatch(deleteGroup(normalizedGroupId));

    if (deleteGroup.fulfilled.match(result)) {
      goToGroups();
    }
  };

  const leaveCurrentGroup = async () => {
    const result = await dispatch(leaveGroup(normalizedGroupId));

    if (leaveGroup.fulfilled.match(result)) {
      goToGroups();
    }
  };

  const openGroupOptions = () => {
    if (!group) {
      return;
    }

    if (isOwner) {
      Alert.alert("Group options", "Owners can delete this group.", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete group",
          style: "destructive",
          onPress: deleteCurrentGroup,
        },
      ]);
      return;
    }

    Alert.alert("Group options", "Leave this group?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Leave group",
        style: "destructive",
        onPress: leaveCurrentGroup,
      },
    ]);
  };

  const isLoading = !hasRequestedGroup || (loading.detail && !group);
  const isMutatingGroup = loading.delete || loading.leave;

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

        {!isLoading && !isMutatingGroup && !group ? (
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
            <GroupDetailHeader
              group={group}
              onBack={() => router.back()}
              onOpenOptions={openGroupOptions}
              optionsDisabled={isMutatingGroup}
            />
            <GroupSummaryCard summary={group.summary} />
            <GroupTabSwitcher
              tabs={groupDetailTabs}
              value={activeTab}
              onChange={setActiveTab}
            />
            <ActivePanel
              group={group}
              deletingExpenseIds={expenseLoading.deleteById || {}}
              invitingMember={loading.invite}
              onBalanceAction={settleGroupBalance}
              onDeleteExpense={removeExpense}
              onDeleteMember={removeMember}
              onInviteMember={inviteMember}
              removingMemberIds={loading.removeMemberById || {}}
              settlingIds={{ ...remindingIds, ...settlingIds }}
              tab={activeTab}
            />
          </>
        ) : null}
      </ScrollView>
      {group ? <AddExpenseFab onPress={openAddExpense} /> : null}
    </SafeAreaView>
  );
}
