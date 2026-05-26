import React, { useMemo, useState } from "react";
import { DollarSign, Tag, Users } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, TextField, useTheme } from "../../design-system";
import {
  CreateGroupFooter,
  FormSection,
  MemberInviteRow,
  ModalHeader,
  SelectChips,
} from "./components";
import { categoryOptions, currencyOptions, suggestedMembers } from "./data/createGroupOptions";

export function CreateGroupScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState(categoryOptions[0].value);
  const [currency, setCurrency] = useState(currencyOptions[0].value);
  const canCreate = useMemo(() => groupName.trim().length > 1, [groupName]);

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
        <ModalHeader onClose={closeModal} />

        <Card variant="limeHero" style={{ marginBottom: theme.space[6] }}>
          <View style={{ gap: theme.space[2] }}>
            <Users
              color={theme.semantic.accentText}
              size={theme.space[6]}
              strokeWidth={theme.borderWidths.medium}
            />
            <TextField
              label="Group name"
              value={groupName}
              onChangeText={setGroupName}
              placeholder="Dhanmondi Flat"
              style={{
                backgroundColor: theme.rgba.black06,
                borderColor: theme.rgba.black10,
              }}
            />
          </View>
        </Card>

        <FormSection title="Category" subtitle="Used for group tags and quick scanning.">
          <View style={{ gap: theme.space[3] }}>
            <View style={{ alignItems: "center", flexDirection: "row", gap: theme.space[2] }}>
              <Tag
                color={theme.semantic.textMuted}
                size={theme.space[5]}
                strokeWidth={theme.borderWidths.medium}
              />
            </View>
            <SelectChips options={categoryOptions} value={category} onChange={setCategory} />
          </View>
        </FormSection>

        <FormSection title="Base currency" subtitle="Group amounts will use this currency.">
          <View style={{ gap: theme.space[3] }}>
            <View style={{ alignItems: "center", flexDirection: "row", gap: theme.space[2] }}>
              <DollarSign
                color={theme.semantic.textMuted}
                size={theme.space[5]}
                strokeWidth={theme.borderWidths.medium}
              />
            </View>
            <SelectChips options={currencyOptions} value={currency} onChange={setCurrency} />
          </View>
        </FormSection>

        <FormSection title="Invite members" subtitle="Add people now, or invite them later.">
          <View style={{ gap: theme.space[2] }}>
            {suggestedMembers.map((member) => (
              <MemberInviteRow key={member.id} member={member} />
            ))}
          </View>
        </FormSection>

        <CreateGroupFooter canCreate={canCreate} onCancel={closeModal} onCreate={closeModal} />
      </ScrollView>
    </SafeAreaView>
  );
}
