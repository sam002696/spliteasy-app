import React from "react";
import { UserPlus } from "lucide-react-native";
import { View } from "react-native";
import { Button, Text, useTheme } from "../../../design-system";
import { BalanceCard } from "./BalanceCard";
import { ExpenseRow } from "./ExpenseRow";
import { MemberRow } from "./MemberRow";

function SectionTitle({ title, count }) {
  return (
    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
      <Text variant="sectionTitle" color="text">
        {title}
      </Text>
      <Text variant="micro" color="textMuted">
        {count}
      </Text>
    </View>
  );
}

function EmptyPanel({ children }) {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: theme.semantic.surface,
        borderRadius: theme.radii.lg,
        padding: theme.space[5],
      }}
    >
      <Text variant="bodySmall" color="textMuted" align="center">
        {children}
      </Text>
    </View>
  );
}

export function ExpensesPanel({ expenses }) {
  const theme = useTheme();

  return (
    <View style={{ gap: theme.space[3] }}>
      <SectionTitle title="Expenses" count={`${expenses.length} items`} />
      {!expenses.length ? <EmptyPanel>No expenses have been added yet.</EmptyPanel> : null}
      {expenses.map((expense) => (
        <ExpenseRow key={expense.id} expense={expense} />
      ))}
    </View>
  );
}

export function BalancesPanel({ balances }) {
  const theme = useTheme();

  return (
    <View style={{ gap: theme.space[3] }}>
      <SectionTitle title="Balances" count={`${balances.length} open`} />
      {!balances.length ? <EmptyPanel>No open balances right now.</EmptyPanel> : null}
      {balances.map((balance) => (
        <BalanceCard key={balance.id} balance={balance} />
      ))}
    </View>
  );
}

export function MembersPanel({ members }) {
  const theme = useTheme();

  return (
    <View style={{ gap: theme.space[3] }}>
      <SectionTitle title="Members" count={`${members.length} people`} />
      <Button
        title="Invite member"
        variant="dark"
        fullWidth
        left={
          <UserPlus
            color={theme.semantic.accent}
            size={theme.space[4]}
            strokeWidth={theme.borderWidths.medium}
          />
        }
      />
      {!members.length ? <EmptyPanel>No members found.</EmptyPanel> : null}
      {members.map((member) => (
        <MemberRow key={member.id} member={member} />
      ))}
    </View>
  );
}
