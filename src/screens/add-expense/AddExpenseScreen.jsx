import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  CircleAlert,
  FileText,
  UserRound,
  Users,
} from "lucide-react-native";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModeToggle, Text, TextField, useTheme } from "../../design-system";
import {
  createExpense,
  fetchBalances,
  fetchGroup,
  fetchGroupBalances,
  fetchGroupExpenses,
  fetchGroupMembers,
  fetchGroups,
  selectActiveBalanceFilter,
  selectActiveGroupFilter,
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
  const palette = theme.addExpenseScreen;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const normalizedGroupId = String(groupId);
  const selectedGroup = useAppSelector(selectSelectedGroup);
  const activeBalanceFilter = useAppSelector(selectActiveBalanceFilter);
  const activeGroupFilter = useAppSelector(selectActiveGroupFilter);
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
  const [currency] = useState("BDT");
  const [expenseDate, setExpenseDate] = useState(getTodayInputValue());
  const [payerId, setPayerId] = useState(null);
  const [splitMethod, setSplitMethod] = useState("equal");
  const selectedCurrency =
    currencyOptions.find((option) => option.value === currency) ||
    currencyOptions[0];
  const currencyNames = {
    BDT: "Bangladeshi Taka",
    EUR: "Euro",
    USD: "US Dollar",
  };
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

    const result = await dispatch(
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
      dispatch(fetchGroups(activeGroupFilter));
      dispatch(fetchBalances(activeBalanceFilter));
      router.replace("/groups");
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: theme.semantic.background,
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          automaticallyAdjustKeyboardInsets
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: theme.space[4],
            paddingBottom: theme.space[8] * 3,
          }}
        >
          <AddExpenseHeader onClose={closeModal} />
          <AmountCard amount={amount} onAmountChange={setAmount} />
          <ModeToggle
            options={entryModes}
            value={entryMode}
            onChange={setEntryMode}
            style={{ marginBottom: theme.space[2] }}
          />

          {entryMode === "scan" ? (
            <ScanPlaceholder />
          ) : (
            <View style={{ marginTop: theme.space[6] }}>
              <FormSection title="Details">
                <View style={{ gap: theme.space[3] }}>
                  <TextField
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Dinner, groceries, rent..."
                    left={<FieldIcon icon={FileText} />}
                    style={{
                      backgroundColor: palette.fieldBackground,
                      borderColor: palette.fieldBorder,
                    }}
                  />
                  <TextField
                    value={groupName}
                    editable={false}
                    left={<FieldIcon icon={UserRound} />}
                    style={{
                      backgroundColor: palette.fieldBackground,
                      borderColor: palette.fieldBorder,
                    }}
                  />
                  <TextField
                    value={expenseDate}
                    onChangeText={setExpenseDate}
                    placeholder="YYYY-MM-DD"
                    keyboardType="numbers-and-punctuation"
                    left={<FieldIcon icon={CalendarDays} />}
                    helperText="Use YYYY-MM-DD format."
                    style={{
                      backgroundColor: palette.fieldBackground,
                      borderColor: palette.fieldBorder,
                    }}
                  />
                </View>
              </FormSection>

              <FormSection title="Currency">
                <View style={{ gap: theme.space[3] }}>
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: palette.cardBackground,
                      borderRadius: theme.radii.lg,
                      flexDirection: "row",
                      gap: theme.space[3],
                      padding: theme.space[4],
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: palette.currencyIconBackground,
                        borderRadius: theme.radii.md,
                        height: theme.sizes.iconButton,
                        justifyContent: "center",
                        width: theme.sizes.iconButton,
                      }}
                    >
                      <Text variant="cardTitle" color="text">
                        ৳
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text variant="cardTitle" color="text">
                        {selectedCurrency.label}
                      </Text>
                      <Text variant="bodySmall" color="textMuted">
                        {currencyNames[currency] || selectedCurrency.label}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: palette.currencyBadgeBackground,
                        borderColor: palette.currencyBadgeBorder,
                        borderRadius: theme.radii.full,
                        borderWidth: theme.borderWidths.hairline,
                        flexDirection: "row",
                        gap: theme.space[1],
                        minHeight: theme.sizes.minTapTarget - theme.space[2],
                        paddingHorizontal: theme.space[3],
                      }}
                    >
                      <Check
                        color={palette.currencyBadgeText}
                        size={theme.space[4]}
                        strokeWidth={theme.borderWidths.medium}
                      />
                      <Text variant="field" color={palette.currencyBadgeText}>
                        From settings
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      gap: theme.space[1],
                    }}
                  >
                    <CircleAlert
                      color={theme.semantic.textMuted}
                      size={theme.space[4]}
                      strokeWidth={theme.borderWidths.medium}
                    />
                    <Text variant="bodySmall" color="textMuted">
                      Change your default currency in Profile - Settings.
                    </Text>
                  </View>
                </View>
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
                  value={`${participantUserIds.length} people · ${splitMethod}`}
                  editable={false}
                  left={<FieldIcon icon={Users} translateY={2} />}
                  helperText={
                    splitMethod === "equal"
                      ? "This expense will be split equally across all group members."
                      : "Only equal split is supported by the backend right now."
                  }
                  style={{
                    backgroundColor: palette.fieldBackground,
                    borderColor: palette.fieldBorder,
                  }}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
