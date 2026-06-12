import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";
import { AnimatedSection } from "./AnimatedSection";

export function ProfileHeader() {
  const theme = useTheme();

  return (
    <AnimatedSection>
      <View style={[styles.root, { marginBottom: theme.space[5] }]}>
        <View style={{ flex: 1, gap: theme.space[1] }}>
          <Text variant="label" color="textMuted" uppercase>
            Account
          </Text>
          <Text variant="screenTitle" color="text">
            Profile
          </Text>
        </View>
      </View>
    </AnimatedSection>
  );
}

const styles = StyleSheet.create({
  action: {
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    alignItems: "center",
    flexDirection: "row",
  },
});
