import React from "react";
import { Text as RNText } from "react-native";
import { useTheme } from "../theme";
import { colorValue } from "../utils/style";

const variantMap = {
  heroAmount: "heroAmount",
  screenTitle: "screenTitle",
  sectionTitle: "sectionTitle",
  cardTitle: "cardTitle",
  cardAmount: "cardAmount",
  body: "body",
  bodySmall: "bodySmall",
  field: "field",
  label: "label",
  micro: "micro",
  scannerTip: "scannerTip",
};

export function Text({
  children,
  variant = "body",
  color = "text",
  align,
  uppercase = false,
  numberOfLines,
  style,
  ...props
}) {
  const theme = useTheme();
  const typeStyle = theme.typography[variantMap[variant] || "body"];

  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[
        typeStyle,
        {
          color: colorValue(theme, color),
          textAlign: align,
          textTransform: uppercase ? "uppercase" : undefined,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}
