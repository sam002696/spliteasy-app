import React from "react";
import { View } from "react-native";
import { useTheme } from "../theme";

export function ProgressBar({ value = 0, max = 1, tone = "positive", height = 8, style }) {
  const theme = useTheme();
  const percent = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;
  const fillColor = theme.semantic[tone] || theme.colors[tone] || tone;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max, now: value }}
      style={[
        {
          backgroundColor: theme.rgba.black10,
          borderRadius: theme.radii.full,
          height,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <View
        style={{
          backgroundColor: fillColor,
          borderRadius: theme.radii.full,
          height: "100%",
          width: `${percent * 100}%`,
        }}
      />
    </View>
  );
}
