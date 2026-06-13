import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";
import { AnimatedSection } from "./AnimatedSection";

export function BalancesHeader() {
  const theme = useTheme();

  return (
    <AnimatedSection>
      <View style={[styles.root, { marginBottom: theme.space[5] }]}>
        <View style={{ flex: 1, gap: theme.space[1] }}>
          <Text variant="screenTitle" color="text">
            Balances
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
