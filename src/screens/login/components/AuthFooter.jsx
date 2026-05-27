import React from "react";
import { Pressable, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function AuthFooter({ onSignUp }) {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: theme.space[2],
        justifyContent: "center",
      }}
    >
      <Text variant="body" color="textMuted">
        Don't have an account?
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={onSignUp}
        style={({ pressed }) => ({
          opacity: pressed ? 0.72 : 1,
        })}
      >
        <Text variant="field" color="accent">
          Sign up
        </Text>
      </Pressable>
    </View>
  );
}
