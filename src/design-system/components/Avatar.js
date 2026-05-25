import React from "react";
import { Image, View } from "react-native";
import { useTheme } from "../theme";
import { Text } from "./Text";

const sizes = {
  sm: "avatarSm",
  md: "avatarMd",
  lg: "avatarLg",
};

function initialsFor(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Avatar({ name, source, size = "md", style }) {
  const theme = useTheme();
  const dimension = theme.sizes[sizes[size]] || theme.sizes.avatarMd;
  const initials = initialsFor(name);

  return (
    <View
      accessibilityLabel={name}
      style={[
        {
          alignItems: "center",
          backgroundColor: theme.semantic.surfaceStrong,
          borderRadius: theme.radii.full,
          height: dimension,
          justifyContent: "center",
          overflow: "hidden",
          width: dimension,
        },
        style,
      ]}
    >
      {source ? (
        <Image source={source} style={{ height: dimension, width: dimension }} />
      ) : (
        <Text variant="micro" color="accent">
          {initials}
        </Text>
      )}
    </View>
  );
}
