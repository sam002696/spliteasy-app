import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function ProfileFooter() {
  const theme = useTheme();

  return (
    <View style={{ paddingBottom: theme.space[8] }}>
      <Text variant="label" color="textMuted" align="center">
        SplitEasy v1.0.0
      </Text>
    </View>
  );
}
