import React, { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  AddExpenseFab,
  BalancesPanel,
  ExpensesPanel,
  GroupDetailHeader,
  GroupSummaryCard,
  GroupTabSwitcher,
  MembersPanel,
} from "./components";
import { getGroupDetail, groupDetailTabs } from "./data/groupDetailData";

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
  const group = useMemo(() => getGroupDetail(groupId), [groupId]);
  const [activeTab, setActiveTab] = useState("expenses");
  const openAddExpense = () => {
    router.push({
      pathname: "/add-expense",
      params: { groupId: group.id },
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: theme.space[4],
          paddingBottom: theme.space[8] * 4,
        }}
      >
        <GroupDetailHeader group={group} onBack={() => router.back()} />
        <GroupSummaryCard summary={group.summary} />
        <GroupTabSwitcher tabs={groupDetailTabs} value={activeTab} onChange={setActiveTab} />
        <ActivePanel group={group} tab={activeTab} />
      </ScrollView>
      <AddExpenseFab onPress={openAddExpense} />
    </SafeAreaView>
  );
}
