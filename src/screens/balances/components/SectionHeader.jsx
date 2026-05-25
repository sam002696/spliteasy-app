import React from "react";
import { View } from "react-native";
import { Text } from "../../../design-system";

export function SectionHeader({ title, meta }) {
  return (
    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
      <Text variant="sectionTitle" color="text">
        {title}
      </Text>
      {meta ? (
        <Text variant="micro" color="textMuted">
          {meta}
        </Text>
      ) : null}
    </View>
  );
}
