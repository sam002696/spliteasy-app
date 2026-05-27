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
        gap: theme.space[4],
        marginVertical: theme.space[5],
      }}
    >
      <View
        style={{
          backgroundColor: theme.rgba.white10,
          flex: 1,
          height: theme.borderWidths.hairline,
        }}
      />
      <Text variant="bodySmall" color="textMuted">
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
