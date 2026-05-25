import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../../../design-system";

export function SectionHeader({ title, action }) {
  return (
    <View style={styles.root}>
      <Text variant="sectionTitle" color="text">
        {title}
      </Text>
      {action ? (
        <Text variant="micro" color="textMuted">
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
