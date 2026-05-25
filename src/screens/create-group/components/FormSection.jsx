import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function FormSection({ title, subtitle, children }) {
  const theme = useTheme();

  return (
    <View style={{ gap: theme.space[3], marginBottom: theme.space[6] }}>
      <View style={{ gap: theme.space[1] }}>
        <Text variant="sectionTitle" color="text">
          {title}
        </Text>
        {subtitle ? (
          <Text variant="bodySmall" color="textMuted">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {children}
    </View>
  );
}
