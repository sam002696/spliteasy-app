import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function FormSection({ title, children }) {
  const theme = useTheme();

  return (
    <View style={{ gap: theme.space[3], marginBottom: theme.space[6] }}>
      <Text variant="sectionTitle" color="text">
        {title}
      </Text>
      {children}
    </View>
  );
}
