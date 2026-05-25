import React from "react";
import { Pressable, View } from "react-native";
import { useTheme } from "../theme";

export function Checkbox({
  checked = false,
  disabled = false,
  onChange,
  accessibilityLabel,
  style,
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      hitSlop={10}
      onPress={() => onChange?.(!checked)}
      style={({ pressed }) => [
        {
          alignItems: "center",
          height: theme.sizes.minTapTarget,
          justifyContent: "center",
          opacity: disabled ? 0.45 : pressed ? 0.75 : 1,
          width: theme.sizes.minTapTarget,
        },
        style,
      ]}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: checked ? theme.semantic.accent : theme.colors.transparent,
          borderColor: checked ? theme.semantic.accent : theme.semantic.disabled,
          borderRadius: 6,
          borderWidth: 1,
          height: 20,
          justifyContent: "center",
          width: 20,
        }}
      >
        {checked ? (
          <View
            style={{
              borderBottomColor: theme.colors.nearBlack,
              borderBottomWidth: 2,
              borderRightColor: theme.colors.nearBlack,
              borderRightWidth: 2,
              height: 10,
              marginTop: -2,
              transform: [{ rotate: "45deg" }],
              width: 6,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
}
