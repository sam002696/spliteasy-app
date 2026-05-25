import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "../../../design-system";
import { FadeInView } from "./FadeInView";

export function Greeting({ name = "Sami" }) {
  const theme = useTheme();

  return (
    <FadeInView delay={theme.motion.fast}>
      <View style={{ marginBottom: theme.space[5] }}>
        <Text variant="label" color="textMuted" uppercase>
          Today
        </Text>
        <Text variant="screenTitle" color="text">
          Good evening, {name}
        </Text>
      </View>
    </FadeInView>
  );
}
