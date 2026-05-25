import React from "react";
import { View } from "react-native";
import { useTheme } from "../theme";
import { colorValue, radiusValue, spacingStyle } from "../utils/style";

export function Box({
  children,
  style,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  flex,
  row = false,
  center = false,
  gap,
  ...spacingProps
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        spacingStyle(theme, spacingProps),
        {
          backgroundColor: colorValue(theme, backgroundColor),
          borderColor: colorValue(theme, borderColor),
          borderRadius: radiusValue(theme, borderRadius),
          borderWidth,
          flex,
          flexDirection: row ? "row" : undefined,
          alignItems: center ? "center" : undefined,
          justifyContent: center ? "center" : undefined,
          gap: theme.space[gap] ?? gap,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
