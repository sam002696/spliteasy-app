import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function SectionHeader({ title, meta }) {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text variant="sectionTitle" color="text">
        {title}
      </Text>
      {meta ? (
        <Text variant="field" color={theme.semantic.secondaryAccent}>
          {meta}
        </Text>
      ) : null}
    </View>
  );
}
