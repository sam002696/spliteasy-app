import React from "react";
import { View } from "react-native";
import { useTheme } from "../theme";

export function Divider({ color = "separator", inset = 0, vertical = false, style }) {
  const theme = useTheme();
  const resolvedColor = theme.semantic[color] || theme.colors[color] || color;

  return (
    <View
      style={[
        vertical
          ? {
              backgroundColor: resolvedColor,
              marginVertical: inset,
              width: 0.5,
            }
          : {
              backgroundColor: resolvedColor,
              height: 0.5,
              marginHorizontal: inset,
            },
        style,
      ]}
    />
  );
}
