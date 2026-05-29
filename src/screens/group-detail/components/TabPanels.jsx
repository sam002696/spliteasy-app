import React, { useState } from "react";
import { MailPlus, UserPlus } from "lucide-react-native";
import { View } from "react-native";
import { Button, Text, TextField, useTheme } from "../../../design-system";
import { isValidEmail, normalizeEmail } from "../../../utils";
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

export function BalancesPanel({ balances, onBalanceAction, settlingIds = {} }) {
  const theme = useTheme();

  return (
    <View style={{ gap: theme.space[3] }}>
      <SectionTitle title="Balances" count={`${balances.length} open`} />
      {!balances.length ? <EmptyPanel>No open balances right now.</EmptyPanel> : null}
      {balances.map((balance) => (
        <BalanceCard
          actionLoading={Boolean(settlingIds[balance.id])}
          key={balance.id}
          balance={balance}
          onActionPress={onBalanceAction}
        />
      ))}
    </View>
  );
}

export function MembersPanel({ inviting = false, members, onInviteMember }) {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const canInvite = isValidEmail(email) && !inviting;

  const inviteMember = async () => {
    if (!canInvite) {
      return;
    }

    const didInvite = await onInviteMember?.(normalizeEmail(email));

    if (didInvite) {
      setEmail("");
    }
  };

  return (
    <View style={{ gap: theme.space[3] }}>
      <SectionTitle title="Members" count={`${members.length} people`} />
      <TextField
        label="Invite by email"
        value={email}
        onChangeText={setEmail}
        placeholder="prangan@example.com"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        left={
          <MailPlus
            color={theme.semantic.textMuted}
            size={theme.space[5]}
            strokeWidth={theme.borderWidths.medium}
          />
        }
      />
      <Button
        title="Invite member"
        variant="dark"
        fullWidth
        disabled={!canInvite}
        loading={inviting}
        left={
          <UserPlus
            color={theme.semantic.accent}
            size={theme.space[4]}
            strokeWidth={theme.borderWidths.medium}
          />
        }
        onPress={inviteMember}
      />
      {!members.length ? <EmptyPanel>No members found.</EmptyPanel> : null}
      {members.map((member) => (
        <MemberRow key={member.id} member={member} />
      ))}
    </View>
  );
}
