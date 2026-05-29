import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, FileText, UserRound, Users } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModeToggle, TextField, useTheme } from "../../design-system";
import {
  createExpense,
  fetchGroup,
  fetchGroupBalances,
  fetchGroupExpenses,
  fetchGroupMembers,
  selectCurrentUser,
  selectExpenses,
  selectGroupMembers,
  selectSelectedGroup,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import {
  AddExpenseFooter,
  AddExpenseHeader,
  AmountCard,
  ChoiceGrid,
  FormSection,
  ScanPlaceholder,
} from "./components";
import {
  currencyOptions,
  entryModes,
  splitMethods,
} from "./data/addExpenseOptions";
import { buildCreateExpensePayload, getTodayInputValue } from "./utils";

function FieldIcon({ icon: Icon, translateY = 1 }) {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        height: theme.typography.field.lineHeight,
        justifyContent: "center",
        transform: [{ translateY }],
        width: theme.space[6],
      }}
    >
      <Icon
        color={theme.semantic.textMuted}
        size={theme.space[5]}
        strokeWidth={theme.borderWidths.medium}
      />
    </View>
  );
}

export function AddExpenseScreen({ groupId }) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const normalizedGroupId = String(groupId);
  const selectedGroup = useAppSelector(selectSelectedGroup);
  const members = useAppSelector(selectGroupMembers(normalizedGroupId));
  const currentUser = useAppSelector(selectCurrentUser);
  const { loading } = useAppSelector(selectExpenses);
  const groupName =
    selectedGroup && String(selectedGroup.id) === normalizedGroupId
      ? selectedGroup.name
      : "Selected group";
  const [entryMode, setEntryMode] = useState("manual");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("BDT");
  const [expenseDate, setExpenseDate] = useState(getTodayInputValue());
  const [payerId, setPayerId] = useState(null);
  const [splitMethod, setSplitMethod] = useState("equal");
  const payerOptions = useMemo(
    () =>
      members.map((member) => ({
        label: member.name,
        value: member.id,
      })),
    [members],
  );
  const participantUserIds = useMemo(
    () => members.map((member) => member.id),
    [members],
  );
  const amountValue = Number(String(amount).replace(/,/g, "").trim());
  const hasValidAmount = Number.isFinite(amountValue) && amountValue > 0;
  const hasValidDate = /^\d{4}-\d{2}-\d{2}$/.test(expenseDate.trim());
  const canSave =
    hasValidAmount &&
    description.trim().length > 1 &&
    hasValidDate &&
    splitMethod === "equal" &&
    Boolean(payerId) &&
    participantUserIds.length > 0;

  useEffect(() => {
    if (!groupId) {
      return;
    }

    dispatch(fetchGroup(normalizedGroupId));
    dispatch(fetchGroupMembers(normalizedGroupId));
  }, [dispatch, groupId, normalizedGroupId]);

  useEffect(() => {
    if (payerId || !members.length) {
      return;
    }

    const currentMember = members.find(
      (member) => member.id === currentUser?.id,
    );
    setPayerId(currentMember?.id || members[0].id);
  }, [currentUser?.id, members, payerId]);

  const closeModal = () => {
    router.back();
  };

  const saveExpense = async () => {
    if (!canSave) {
      return;
    }

    const expense = buildCreateExpensePayload({
      amount,
      currency,
      description,
      expenseDate,
      paidByUserId: payerId,
      participantUserIds,
      splitMethod,
    });

    const result = dispatch(
      createExpense({
        expense,
        groupId: normalizedGroupId,
      }),
    );

    if (createExpense.fulfilled.match(result)) {
      dispatch(fetchGroup(normalizedGroupId));
      dispatch(fetchGroupExpenses(normalizedGroupId));
      dispatch(fetchGroupMembers(normalizedGroupId));
      dispatch(fetchGroupBalances(normalizedGroupId));
      closeModal();
    }
  };

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{
        backgroundColor: theme.semantic.background,
        flex: 1,
      }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: theme.space[4],
          paddingBottom: theme.space[8],
        }}
      >
        <AddExpenseHeader onClose={closeModal} />
        <AmountCard amount={amount} onAmountChange={setAmount} />
        <ModeToggle
          options={entryModes}
          value={entryMode}
          onChange={setEntryMode}
        />

        {entryMode === "scan" ? (
          <ScanPlaceholder />
        ) : (
          <View style={{ marginTop: theme.space[6] }}>
            <FormSection title="Details">
              <View style={{ gap: theme.space[3] }}>
                <TextField
                  label="Description"
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Dinner, groceries, rent..."
                  left={<FieldIcon icon={FileText} />}
                />
                <TextField
                  label="Group"
                  value={groupName}
                  editable={false}
                  left={<FieldIcon icon={UserRound} />}
                />
                <TextField
                  label="Date"
                  value={expenseDate}
                  onChangeText={setExpenseDate}
                  placeholder="YYYY-MM-DD"
                  keyboardType="numbers-and-punctuation"
                  left={<FieldIcon icon={CalendarDays} />}
                  helperText="Use YYYY-MM-DD format."
                />
              </View>
            </FormSection>

            <FormSection title="Currency">
              <ChoiceGrid
                options={currencyOptions}
                value={currency}
                onChange={setCurrency}
              />
            </FormSection>

            <FormSection title="Who paid">
              <ChoiceGrid
                options={payerOptions}
                value={payerId}
                onChange={setPayerId}
              />
            </FormSection>

            <FormSection title="Split method">
              <ChoiceGrid
                options={splitMethods}
                value={splitMethod}
                onChange={setSplitMethod}
              />
            </FormSection>

            <FormSection title="Split preview">
              <TextField
                label="Members"
                value={`${participantUserIds.length} people · ${splitMethod}`}
                editable={false}
                left={<FieldIcon icon={Users} translateY={2} />}
                helperText={
                  splitMethod === "equal"
                    ? "This expense will be split equally across all group members."
                    : "Only equal split is supported by the backend right now."
                }
              />
            </FormSection>
          </View>
        )}

        <View style={{ marginTop: theme.space[6] }}>
          <AddExpenseFooter
            canSave={entryMode === "scan" ? false : canSave}
            loading={loading.create}
            onSave={saveExpense}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
