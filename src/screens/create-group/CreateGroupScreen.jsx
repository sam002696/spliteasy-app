import React, { useState } from "react";
import { Check, CircleAlert, Mail, Plus, Users } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, TextField, useTheme } from "../../design-system";
import {
  createGroup,
  fetchGroups,
  groupFilters,
  selectGroupsState,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import {
  CreateGroupFooter,
  FormSection,
  ModalHeader,
  SelectChips,
  SelectedInviteRow,
} from "./components";
import { categoryOptions, currencyOptions } from "./data/createGroupOptions";
import { isValidEmail, normalizeEmail } from "../../utils";
import { buildCreateGroupPayload } from "./utils";

export function CreateGroupScreen() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectGroupsState);
  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState(categoryOptions[0].value);
  const [customCategory, setCustomCategory] = useState("");
  const [currency] = useState(currencyOptions[0].value);
  const [inviteEmail, setInviteEmail] = useState("");
  const [memberEmails, setMemberEmails] = useState([]);
  const palette = theme.createGroupScreen;
  const canAddEmail = isValidEmail(inviteEmail);
  const canCreate = groupName.trim().length > 1 && !loading.create;
  const selectedCategory = customCategory.trim() || category;
  const selectedCurrency =
    currencyOptions.find((option) => option.value === currency) ||
    currencyOptions[0];

  const currencyNames = {
    BDT: "Bangladeshi Taka",
    EUR: "Euro",
    USD: "US Dollar",
  };

  const closeModal = () => {
    router.back();
  };

  const selectCategory = (value) => {
    setCustomCategory("");
    setCategory(value);
  };

  const updateCustomCategory = (value) => {
    setCustomCategory(value);

    if (value.trim()) {
      setCategory(value.trim());
    } else {
      setCategory(categoryOptions[0].value);
    }
  };

  const addInviteEmail = (email) => {
    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      return;
    }

    setMemberEmails((currentEmails) => {
      if (currentEmails.includes(normalizedEmail)) {
        return currentEmails;
      }

      return [...currentEmails, normalizedEmail];
    });
    setInviteEmail("");
  };

  const removeInviteEmail = (email) => {
    setMemberEmails((currentEmails) =>
      currentEmails.filter((memberEmail) => memberEmail !== email),
    );
  };

  const createNewGroup = async () => {
    if (!canCreate) {
      return;
    }

    const result = await dispatch(
      createGroup(
        buildCreateGroupPayload({
          category: selectedCategory,
          currency,
          memberEmails,
          name: groupName,
        }),
      ),
    );

    if (createGroup.fulfilled.match(result)) {
      await dispatch(fetchGroups(groupFilters.all));
      closeModal();
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
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: theme.space[4],
          paddingBottom: theme.space[8] * 3,
        }}
      >
          <ModalHeader onClose={closeModal} />

          <Card
            variant="plain"
            style={{
              backgroundColor: palette.cardBackground,
              borderRadius: theme.radii.xl,
              marginBottom: theme.space[6],
            }}
          >
            <View style={{ gap: theme.space[3] }}>
              <Text variant="field" color="textMuted" uppercase>
                Group name
              </Text>
              <TextField
                value={groupName}
                onChangeText={setGroupName}
                placeholder="Dhanmondi Flat"
                left={
                  <Users
                    color={theme.semantic.textMuted}
                    size={theme.space[5]}
                    strokeWidth={theme.borderWidths.medium}
                  />
                }
                style={{
                  backgroundColor: palette.fieldBackground,
                  borderColor: palette.fieldBorder,
                }}
              />
            </View>
          </Card>

          <FormSection
            title="Invite members"
            subtitle="Add people now, or invite them later."
          >
            <View style={{ gap: theme.space[3] }}>
              <View style={{ flexDirection: "row", gap: theme.space[2] }}>
                <View style={{ flex: 1 }}>
                  <TextField
                    value={inviteEmail}
                    onChangeText={setInviteEmail}
                    placeholder="Enter email address"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    left={
                      <Mail
                        color={theme.semantic.textMuted}
                        size={theme.space[5]}
                        strokeWidth={theme.borderWidths.medium}
                      />
                    }
                    style={{
                      backgroundColor: palette.fieldBackground,
                      borderColor: palette.fieldBorder,
                    }}
                  />
                </View>
                <Pressable
                  accessibilityRole="button"
                  disabled={!canAddEmail}
                  onPress={() => addInviteEmail(inviteEmail)}
                  style={({ pressed }) => ({
                    alignItems: "center",
                    alignSelf: "flex-end",
                    backgroundColor: palette.footerButtonBackground,
                    borderRadius: theme.radii.lg,
                    height: theme.sizes.minTapTarget + theme.space[3],
                    justifyContent: "center",
                    opacity: !canAddEmail ? 0.45 : pressed ? 0.78 : 1,
                    width: theme.sizes.minTapTarget + theme.space[3],
                  })}
                >
                  <Plus
                    color={palette.footerButtonText}
                    size={theme.space[6]}
                    strokeWidth={theme.borderWidths.medium}
                  />
                </Pressable>
              </View>

              {memberEmails.map((email) => (
                <SelectedInviteRow
                  key={email}
                  email={email}
                  onRemove={() => removeInviteEmail(email)}
                />
              ))}
            </View>
          </FormSection>

          <FormSection
            title="Category"
            subtitle="Used for group tags and quick scanning."
          >
            <View style={{ gap: theme.space[3] }}>
              <SelectChips
                options={categoryOptions}
                value={customCategory.trim() ? customCategory.trim() : category}
                onChange={selectCategory}
              />
              <TextField
                value={customCategory}
                onChangeText={updateCustomCategory}
                placeholder="Or type a custom category..."
                left={
                  <Plus
                    color={theme.semantic.textMuted}
                    size={theme.space[5]}
                    strokeWidth={theme.borderWidths.medium}
                  />
                }
                style={{
                  backgroundColor: theme.colors.transparent,
                  borderColor: palette.dashedBorder,
                  borderStyle: "dashed",
                }}
              />
            </View>
          </FormSection>

          <FormSection
            title="Base currency"
            subtitle="Group amounts will use this currency."
          >
            <View style={{ gap: theme.space[3] }}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  backgroundColor: palette.cardBackground,
                  borderRadius: theme.radii.lg,
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

          <CreateGroupFooter
            canCreate={canCreate}
            loading={loading.create}
            onCancel={closeModal}
            onCreate={createNewGroup}
          />
      </ScrollView>
    </SafeAreaView>
  );
}
