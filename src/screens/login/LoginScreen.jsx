import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, useTheme } from "../../design-system";
import { login, selectAuth, useAppDispatch, useAppSelector } from "../../store";
import {
  AuthDivider,
  AuthFooter,
  GoogleButton,
  LoginForm,
  LoginHeader,
} from "./components";

export function LoginScreen() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectAuth);

  const handleSubmit = async ({ email, password }) => {
    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      router.replace("/(tabs)");
    }
  };
  const handleForgotPassword = () => {};
  const handleGoogle = () => {};
  const handleSignUp = () => {};

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{
        backgroundColor: theme.semantic.background,
        flex: 1,
      }}
    >
      <StatusBar style="light" backgroundColor={theme.semantic.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              backgroundColor: theme.semantic.background,
              flex: 1,
              paddingHorizontal: theme.space[5],
              paddingTop: theme.space[4],
              paddingBottom: theme.space[6],
            }}
          >
            <LoginHeader />

            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                marginTop: 28,
              }}
            >
              <View>
                <View
                  style={{ gap: theme.space[3], marginBottom: theme.space[6] }}
                >
                  <Text
                    variant="screenTitle"
                    color="text"
                    style={{
                      fontSize: 34,
                      lineHeight: 40,
                    }}
                  >
                    Welcome back
                  </Text>
                  <Text
                    variant="body"
                    color="textMuted"
                    style={{
                      fontSize: 16,
                      lineHeight: 23,
                    }}
                  >
                    Enter your details to access your account.
                  </Text>
                </View>

                <LoginForm
                  isSubmitting={loading.login}
                  onForgotPassword={handleForgotPassword}
                  onSubmit={handleSubmit}
                />

                <AuthDivider />
                <GoogleButton onPress={handleGoogle} />
              </View>

              <AuthFooter onSignUp={handleSignUp} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
