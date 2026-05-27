import React, { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Button, Text, TextField, useTheme } from "../../../design-system";

export function LoginForm({ onForgotPassword, onSubmit }) {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.trim().length > 0,
    [email, password]
  );

  const fieldStyle = {
    backgroundColor: theme.semantic.card,
    borderColor: theme.rgba.white10,
    borderRadius: theme.radii.xl,
    height: 82,
    paddingHorizontal: theme.space[5],
  };

  const inputStyle = {
    color: theme.semantic.text,
    fontSize: 20,
    fontWeight: theme.fontWeights.regular,
    height: 26,
    lineHeight: 26,
  };

  return (
    <View style={{ gap: theme.space[5] }}>
      <View style={{ gap: theme.space[5] }}>
        <TextField
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
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          style={fieldStyle}
          inputStyle={inputStyle}
          right={
            <Pressable
              accessibilityLabel={isPasswordVisible ? "Hide password" : "Show password"}
              accessibilityRole="button"
              hitSlop={10}
              onPress={() => setIsPasswordVisible((visible) => !visible)}
            >
              {isPasswordVisible ? (
                <EyeOff color={theme.semantic.textMuted} size={22} strokeWidth={1.8} />
              ) : (
                <Eye color={theme.semantic.textMuted} size={22} strokeWidth={1.8} />
              )}
            </Pressable>
          }
        />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onForgotPassword}
        style={({ pressed }) => ({
          alignSelf: "flex-end",
          opacity: pressed ? 0.72 : 1,
        })}
      >
        <Text variant="field" color="accent">
          Forgot password?
        </Text>
      </Pressable>

      <Button
        title="Continue"
        size="lg"
        fullWidth
        disabled={!canSubmit}
        onPress={() => onSubmit?.({ email, password })}
        style={{
          height: 72,
          marginTop: theme.space[3],
        }}
        textStyle={{
          fontSize: 20,
          lineHeight: 24,
        }}
      />
    </View>
  );
}
