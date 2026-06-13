import React, { useState } from "react";
import { MailPlus, Plus } from "lucide-react-native";
import { View } from "react-native";
import { SwipeToDeleteRow } from "../../../components";
import { Button, Text, TextField, useTheme } from "../../../design-system";
import { isValidEmail, normalizeEmail } from "../../../utils";
import { BalanceCard } from "./BalanceCard";
import { ExpenseRow } from "./ExpenseRow";
import { MemberRow } from "./MemberRow";

function SectionTitle({ title, count }) {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text variant="sectionTitle" color="text">
        {title}
      </Text>
      <Text variant="field" color={theme.semantic.secondaryAccent}>
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
        backgroundColor: theme.groupDetailScreen.cardBackground,
        borderRadius: theme.radii.xl,
        padding: theme.space[5],
      }}
    >
      <Text variant="bodySmall" color="textMuted" align="center">
        {children}
      </Text>
    </View>
  );
}

export function ExpensesPanel({
  deletingExpenseIds = {},
  expenses,
  onDeleteExpense,
}) {
  const theme = useTheme();

  return (
    <View style={{ gap: theme.space[3] }}>
      <SectionTitle title="Expenses" count={`${expenses.length} items`} />
      {!expenses.length ? (
        <EmptyPanel>No expenses have been added yet.</EmptyPanel>
      ) : null}
      {expenses.map((expense) => (
        <SwipeToDeleteRow
          deleting={Boolean(deletingExpenseIds[expense.id])}
          key={expense.id}
          onDelete={() => onDeleteExpense?.(expense)}
        >
          <ExpenseRow expense={expense} />
        </SwipeToDeleteRow>
      ))}
    </View>
  );
}

export function BalancesPanel({ balances, onBalanceAction, settlingIds = {} }) {
  const theme = useTheme();

  return (
    <View style={{ gap: theme.space[3] }}>
      <SectionTitle title="Balances" count={`${balances.length} open`} />
      {!balances.length ? (
        <EmptyPanel>No open balances right now.</EmptyPanel>
      ) : null}
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

export function MembersPanel({
  inviting = false,
  members,
  onDeleteMember,
  onInviteMember,
  removingMemberIds = {},
}) {
  const theme = useTheme();
  const palette = theme.groupDetailScreen;
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
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email address"
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
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: theme.semantic.border,
        }}
      />
      <Button
        title="Invite member"
        variant="danger"
        fullWidth
        disabled={!canInvite}
        loading={inviting}
        style={{
          backgroundColor: palette.actionBackground,
          borderColor: palette.actionBackground,
        }}
        textStyle={{ color: palette.actionText }}
        left={
          <Plus
            color={palette.actionText}
            size={theme.space[4]}
            strokeWidth={theme.borderWidths.medium}
          />
        }
        onPress={inviteMember}
      />
      {!members.length ? <EmptyPanel>No members found.</EmptyPanel> : null}
      {members.map((member) => (
        <SwipeToDeleteRow
          deleting={Boolean(removingMemberIds[member.id])}
          disabled={member.isCurrentUser || member.status === "Owner"}
          key={member.id}
          onDelete={() => onDeleteMember?.(member)}
        >
          <MemberRow member={member} />
        </SwipeToDeleteRow>
      ))}
    </View>
  );
}
