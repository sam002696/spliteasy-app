import React from "react";
import { View } from "react-native";
import { useTheme } from "../theme";
import { Text } from "./Text";

const tones = {
  lime: {
    background: "accent",
    text: "accentText",
  },
  orange: {
    background: "secondaryAccent",
    text: "accentText",
  },
  black: {
    background: "surfaceStrong",
    text: "white",
  },
  neutral: {
    background: "surface",
    text: "text",
  },
  danger: {
    background: "danger",
    text: "white",
  },
};

export function Badge({ label, tone = "lime", style, textStyle }) {
  const theme = useTheme();
  const colors = tones[tone] || tones.lime;

  return (
    <View
      style={[
        {
          alignItems: "center",
          alignSelf: "flex-start",
          backgroundColor: theme.semantic[colors.background],
          borderRadius: theme.radii.full,
          justifyContent: "center",
          minHeight: 24,
          paddingHorizontal: theme.space[3],
        },
        style,
      ]}
    >
      <Text variant="micro" color={colors.text} style={textStyle}>
        {label}
      </Text>
    </View>
  );
}
