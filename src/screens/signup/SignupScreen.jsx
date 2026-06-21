import React, { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, TextField, useTheme } from "../../design-system";
import { register, selectAuth, useAppDispatch, useAppSelector } from "../../store";

function PasswordToggle({ visible, onPress }) {
  const theme = useTheme();
  const Icon = visible ? EyeOff : Eye;

  return (
    <Pressable
      accessibilityLabel={visible ? "Hide password" : "Show password"}
      accessibilityRole="button"
      hitSlop={10}
      onPress={onPress}
    >
      <Icon color={theme.semantic.textMuted} size={20} strokeWidth={1.8} />
    </Pressable>
  );
}

export function SignupScreen() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectAuth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const passwordError = password.length > 0 && password.length < 8
    ? "Use at least 8 characters."
    : undefined;
  const confirmationError = passwordConfirmation.length > 0 && password !== passwordConfirmation
    ? "Passwords do not match."
    : undefined;
  const canSubmit = useMemo(
    () =>
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.length >= 8 &&
      password === passwordConfirmation,
    [email, name, password, passwordConfirmation],
  );

  const fieldStyle = {
    backgroundColor: theme.colors.white,
    borderColor: theme.rgba.black10,
    borderRadius: theme.radii.lg,
    height: 58,
    paddingHorizontal: theme.space[4],
  };
  const inputStyle = {
    color: theme.semantic.text,
    fontSize: 16,
    fontWeight: theme.fontWeights.regular,
    height: 22,
    lineHeight: 22,
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    const result = await dispatch(register({
      name: name.trim(),
      email: email.trim(),
      password,
      password_confirmation: passwordConfirmation,
    }));

    if (register.fulfilled.match(result)) {
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{ backgroundColor: theme.semantic.background, flex: 1 }}
    >
      <StatusBar style="dark" backgroundColor={theme.semantic.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={{
              flex: 1,
              paddingBottom: theme.space[6],
              paddingHorizontal: theme.space[5],
              paddingTop: theme.space[6],
            }}
          >
            <Text
              variant="micro"
              color="secondaryAccent"
              uppercase
              style={{ letterSpacing: 4, marginBottom: theme.space[8] }}
            >
              SplitEasy
            </Text>

            <View style={{ gap: theme.space[3], marginBottom: theme.space[8] }}>
              <Text
                variant="screenTitle"
                color="text"
                style={{ fontSize: 34, lineHeight: 40 }}
              >
                Create your account.
              </Text>
              <Text
                variant="body"
                color="textMuted"
                style={{ fontSize: 16, lineHeight: 23 }}
              >
                Start a group, add shared expenses, and let SplitEasy handle the math.
              </Text>
            </View>

            <View style={{ gap: theme.space[3] }}>
              <TextField
                label="Name"
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                autoCapitalize="words"
                autoCorrect={false}
                textContentType="name"
                style={fieldStyle}
                inputStyle={inputStyle}
              />
              <TextField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                style={fieldStyle}
                inputStyle={inputStyle}
              />
              <TextField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="At least 8 characters"
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                error={passwordError}
                style={fieldStyle}
                inputStyle={inputStyle}
                right={
                  <PasswordToggle
                    visible={passwordVisible}
                    onPress={() => setPasswordVisible((visible) => !visible)}
                  />
                }
              />
              <TextField
                label="Confirm password"
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
                placeholder="Enter password again"
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                error={confirmationError}
                style={fieldStyle}
                inputStyle={inputStyle}
              />
            </View>

            <Button
              title="Create account"
              size="lg"
              fullWidth
              disabled={!canSubmit || loading.register}
              loading={loading.register}
              onPress={handleSubmit}
              style={{
                backgroundColor: theme.semantic.secondaryAccent,
                borderColor: theme.semantic.secondaryAccent,
                height: 58,
                marginTop: theme.space[6],
              }}
              textStyle={{ color: theme.colors.white, fontSize: 16, lineHeight: 20 }}
            />

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: theme.space[2],
                justifyContent: "center",
                marginTop: theme.space[6],
              }}
            >
              <Text variant="bodySmall" color="textMuted">
                Already have an account?
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.replace("/login")}
                style={({ pressed }) => ({ opacity: pressed ? 0.72 : 1 })}
              >
                <Text
                  variant="bodySmall"
                  color="secondaryAccent"
                  style={{ fontWeight: theme.fontWeights.semibold }}
                >
                  Sign in
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
