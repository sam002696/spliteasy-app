import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../theme";

const variants = {
  limeHero: {
    background: "accent",
    radius: "hero",
    padding: 4,
  },
  black: {
    background: "surfaceStrong",
    radius: "lg",
    padding: 4,
  },
  neutral: {
    background: "surface",
    radius: "md",
    padding: 4,
  },
  plain: {
    background: "card",
    radius: "md",
    padding: 4,
  },
};

export function Card({ children, variant = "plain", padded = true, style }) {
  const theme = useTheme();
  const config = variants[variant] || variants.plain;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.semantic[config.background],
          borderRadius: theme.radii[config.radius],
          padding: padded ? theme.space[config.padding] : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
  },
});
