import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function SectionHeader({ title, action }) {
  const theme = useTheme();

  return (
    <View style={[styles.root, { marginBottom: theme.space[3] }]}>
      <Text variant="sectionTitle" color="text">
        {title}
      </Text>
      {action ? (
        <Text variant="field" color="secondaryAccent">
          {action}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
