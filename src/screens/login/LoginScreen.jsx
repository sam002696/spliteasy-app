import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, useTheme } from "../../design-system";
import {
  AuthDivider,
  AuthFooter,
  GoogleButton,
  LoginForm,
  LoginHeader,
} from "./components";

export function LoginScreen() {
  const theme = useTheme();

  const handleSubmit = () => {};
  const handleForgotPassword = () => {};
  const handleGoogle = () => {};
  const handleSignUp = () => {};

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{
        backgroundColor: theme.colors.black,
        flex: 1,
      }}
    >
      <StatusBar style="light" backgroundColor={theme.colors.black} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            padding: theme.space[4],
          }}
        >
          <View
            style={{
              backgroundColor: theme.semantic.background,
              borderColor: theme.rgba.white10,
              borderRadius: theme.radii.hero,
              borderWidth: theme.borderWidths.hairline,
              flex: 1,
              minHeight: 760,
              overflow: "hidden",
              paddingHorizontal: theme.space[6],
              paddingTop: theme.space[5],
              paddingBottom: theme.space[8],
            }}
          >
            <LoginHeader />

            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                marginTop: theme.space[8],
              }}
            >
              <View>
                <View style={{ gap: theme.space[4], marginBottom: theme.space[8] }}>
                  <Text
                    variant="heroAmount"
                    color="text"
                    style={{
                      fontSize: 40,
                      lineHeight: 46,
                    }}
                  >
                    Welcome back
                  </Text>
                  <Text
                    variant="body"
                    color="textMuted"
                    style={{
                      fontSize: 20,
                      lineHeight: 28,
                    }}
                  >
                    Enter your details to access your account.
                  </Text>
                </View>

                <LoginForm
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
