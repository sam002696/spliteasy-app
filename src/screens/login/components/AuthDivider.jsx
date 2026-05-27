import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function AuthDivider({ label = "Or continue with" }) {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        gap: theme.space[6],
        marginVertical: theme.space[6],
      }}
    >
      <View
        style={{
          backgroundColor: theme.rgba.white10,
          flex: 1,
          height: theme.borderWidths.hairline,
        }}
      />
      <Text variant="body" color="textMuted">
        {label}
      </Text>
      <View
        style={{
          backgroundColor: theme.rgba.white10,
          flex: 1,
          height: theme.borderWidths.hairline,
        }}
      />
    </View>
  );
}
