import React from "react";
import { Pressable } from "react-native";
import { useTheme } from "../theme";

const tones = {
  dark: {
    background: "surfaceStrong",
    content: "white",
  },
  lime: {
    background: "accent",
    content: "accentText",
  },
  neutral: {
    background: "surface",
    content: "text",
  },
  ghost: {
    background: "transparent",
    content: "text",
  },
};

export function IconButton({
  icon,
  label,
  tone = "neutral",
  size = 44,
  disabled = false,
  style,
  ...pressableProps
}) {
  const theme = useTheme();
  const colors = tones[tone] || tones.neutral;
  const resolvedSize = Math.max(size, theme.sizes.minTapTarget);

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      disabled={disabled}
      hitSlop={8}
      style={({ pressed }) => [
        {
          alignItems: "center",
          backgroundColor: theme.semantic[colors.background],
          borderRadius: theme.radii.full,
          height: resolvedSize,
          justifyContent: "center",
          minHeight: theme.sizes.minTapTarget,
          minWidth: theme.sizes.minTapTarget,
          opacity: disabled ? 0.45 : pressed ? 0.78 : 1,
          width: resolvedSize,
        },
        style,
      ]}
      {...pressableProps}
    >
      {typeof icon === "function" ? icon(theme.semantic[colors.content]) : icon}
    </Pressable>
  );
}
