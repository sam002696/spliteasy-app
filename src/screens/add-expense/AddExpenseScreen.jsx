import React, { useMemo, useState } from "react";
import { CalendarDays, FileText, UserRound, Users } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModeToggle, TextField, useTheme } from "../../design-system";
import { getGroupDetail } from "../group-detail/data/groupDetailData";
import {
  AddExpenseFooter,
  AddExpenseHeader,
  AmountCard,
  ChoiceGrid,
  FormSection,
  ScanPlaceholder,
} from "./components";
import { currencyOptions, entryModes, payers, splitMethods } from "./data/addExpenseOptions";

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
  const group = useMemo(() => getGroupDetail(groupId), [groupId]);
  const [entryMode, setEntryMode] = useState("manual");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("BDT");
  const [payer, setPayer] = useState("sami");
  const [splitMethod, setSplitMethod] = useState("equal");
  const canSave = amount.trim().length > 0 && description.trim().length > 1;

  const closeModal = () => {
    router.back();
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
        <ModeToggle options={entryModes} value={entryMode} onChange={setEntryMode} />

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
                  value={group.name}
                  editable={false}
                  left={<FieldIcon icon={UserRound} />}
                />
                <TextField
                  label="Date"
                  value="Today"
                  editable={false}
                  left={<FieldIcon icon={CalendarDays} />}
                />
              </View>
            </FormSection>

            <FormSection title="Currency">
              <ChoiceGrid options={currencyOptions} value={currency} onChange={setCurrency} />
            </FormSection>

            <FormSection title="Who paid">
              <ChoiceGrid options={payers} value={payer} onChange={setPayer} />
            </FormSection>

            <FormSection title="Split method">
              <ChoiceGrid options={splitMethods} value={splitMethod} onChange={setSplitMethod} />
            </FormSection>

            <FormSection title="Split preview">
              <TextField
                label="Members"
                value={`${group.memberCount} people · ${splitMethod}`}
                editable={false}
                left={<FieldIcon icon={Users} translateY={2} />}
                helperText="Detailed share assignment comes next."
              />
            </FormSection>
          </View>
        )}

        <View style={{ marginTop: theme.space[6] }}>
          <AddExpenseFooter canSave={entryMode === "scan" ? false : canSave} onSave={closeModal} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
