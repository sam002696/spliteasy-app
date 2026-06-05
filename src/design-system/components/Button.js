import React from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../theme";
import { Text } from "./Text";

const buttonVariants = {
  primary: {
    background: "accent",
    text: "accentText",
    border: "accent",
  },
  dark: {
    background: "surfaceStrong",
    text: "accent",
    border: "surfaceStrong",
  },
  danger: {
    background: "danger",
    text: "white",
    border: "danger",
  },
  neutral: {
    background: "surface",
    text: "text",
    border: "surface",
  },
  ghost: {
    background: "transparent",
    text: "text",
    border: "border",
  },
};

const buttonSizes = {
  sm: {
    minHeight: 36,
    paddingHorizontal: 14,
    textVariant: "field",
  },
  md: {
    minHeight: 44,
    paddingHorizontal: 18,
    textVariant: "field",
  },
  lg: {
    minHeight: 52,
    paddingHorizontal: 20,
    textVariant: "field",
  },
};

export function Button({
  title,
  children,
  variant = "primary",
  size = "md",
  left,
  right,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  ...pressableProps
}) {
  const theme = useTheme();
  const tone = buttonVariants[variant] || buttonVariants.primary;
  const dimensions = buttonSizes[size] || buttonSizes.md;
  const backgroundColor = theme.semantic[tone.background] || theme.colors[tone.background];
  const borderColor = theme.semantic[tone.border] || theme.colors[tone.border];
  const textColor = tone.text;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          minHeight: dimensions.minHeight,
          minWidth: theme.sizes.minTapTarget,
          paddingHorizontal: dimensions.paddingHorizontal,
          borderRadius: theme.radii.full,
          backgroundColor,
          borderColor,
          opacity: disabled ? 0.45 : pressed ? 0.82 : 1,
          alignSelf: fullWidth ? "stretch" : "auto",
        },
        style,
      ]}
      {...pressableProps}
    >
      {loading ? <ActivityIndicator color={theme.semantic[textColor]} /> : left}
      {children || (
        <Text variant={dimensions.textVariant} color={textColor} style={[styles.label, textStyle]}>
          {title}
        </Text>
      )}
      {!loading ? right : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderWidth: 0.5,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
  },
});
