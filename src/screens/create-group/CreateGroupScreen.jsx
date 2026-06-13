import React, { useRef, useState } from "react";
import { DollarSign, MailPlus, Tag, Users } from "lucide-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
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
  const scrollViewRef = useRef(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectGroupsState);
  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState(categoryOptions[0].value);
  const [currency, setCurrency] = useState(currencyOptions[0].value);
  const [inviteEmail, setInviteEmail] = useState("");
  const [memberEmails, setMemberEmails] = useState([]);
  const canAddEmail = isValidEmail(inviteEmail);
  const canCreate = groupName.trim().length > 1 && !loading.create;

  const closeModal = () => {
    router.back();
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

  const scrollInviteFieldIntoView = () => {
    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, theme.motion.save);
  };

  const createNewGroup = async () => {
    if (!canCreate) {
      return;
    }

    const result = await dispatch(
      createGroup(
        buildCreateGroupPayload({
          category,
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          automaticallyAdjustKeyboardInsets
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: theme.space[4],
            paddingBottom: theme.space[8] * 3,
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

          <FormSection
            title="Category"
            subtitle="Used for group tags and quick scanning."
          >
            <View style={{ gap: theme.space[3] }}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  gap: theme.space[2],
                }}
              >
                <Tag
                  color={theme.semantic.textMuted}
                  size={theme.space[5]}
                  strokeWidth={theme.borderWidths.medium}
                />
              </View>
              <SelectChips
                options={categoryOptions}
                value={category}
                onChange={setCategory}
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
                  gap: theme.space[2],
                }}
              >
                <DollarSign
                  color={theme.semantic.textMuted}
                  size={theme.space[5]}
                  strokeWidth={theme.borderWidths.medium}
                />
              </View>
              <SelectChips
                options={currencyOptions}
                value={currency}
                onChange={setCurrency}
              />
            </View>
          </FormSection>

          <FormSection
            title="Invite members"
            subtitle="Add people now, or invite them later."
          >
            <View style={{ gap: theme.space[3] }}>
              <View style={{ flexDirection: "row", gap: theme.space[2] }}>
                <View style={{ flex: 1 }}>
                  <TextField
                    label="Email"
                    value={inviteEmail}
                    onChangeText={setInviteEmail}
                    placeholder="nadia@example.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onFocus={scrollInviteFieldIntoView}
                    left={
                      <MailPlus
                        color={theme.semantic.textMuted}
                        size={theme.space[5]}
                        strokeWidth={theme.borderWidths.medium}
                      />
                    }
                  />
                </View>
                <Pressable
                  accessibilityRole="button"
                  disabled={!canAddEmail}
                  onPress={() => addInviteEmail(inviteEmail)}
                  style={({ pressed }) => ({
                    alignItems: "center",
                    alignSelf: "flex-end",
                    backgroundColor: theme.semantic.surfaceStrong,
                    borderRadius: theme.radii.full,
                    height: theme.sizes.minTapTarget + theme.space[2],
                    justifyContent: "center",
                    opacity: !canAddEmail ? 0.45 : pressed ? 0.78 : 1,
                    paddingHorizontal: theme.space[4],
                  })}
                >
                  <Text variant="field" color="accent">
                    Add
                  </Text>
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

          <CreateGroupFooter
            canCreate={canCreate}
            loading={loading.create}
            onCancel={closeModal}
            onCreate={createNewGroup}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
