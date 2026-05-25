import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../theme";
import { Text } from "./Text";

export function TextField({
  label,
  error,
  helperText,
  left,
  right,
  containerStyle,
  inputStyle,
  style,
  editable = true,
  ...inputProps
}) {
  const theme = useTheme();
  const borderColor = error ? theme.semantic.danger : theme.semantic.border;
  const fieldHeight = theme.sizes.minTapTarget + theme.space[2];

  return (
    <View style={[styles.root, containerStyle]}>
      {label ? (
        <Text variant="label" color="textMuted" style={styles.label}>
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.field,
          {
            backgroundColor: theme.semantic.surface,
            borderColor,
            borderRadius: theme.radii.md,
            height: fieldHeight,
            opacity: editable ? 1 : 0.55,
            paddingHorizontal: theme.space[3],
          },
          style,
        ]}
      >
        {left ? <View style={[styles.iconSlot, { width: theme.space[6] }]}>{left}</View> : null}
        <TextInput
          placeholderTextColor={theme.semantic.textMuted}
          editable={editable}
          style={[
            styles.input,
            theme.typography.field,
            {
              color: theme.semantic.text,
              height: theme.typography.field.lineHeight,
            },
            inputStyle,
          ]}
          {...inputProps}
        />
        {right ? <View style={[styles.iconSlot, { width: theme.space[6] }]}>{right}</View> : null}
      </View>
      {error || helperText ? (
        <Text variant="label" color={error ? "danger" : "textMuted"} style={styles.helper}>
          {error || helperText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 6,
  },
  label: {
    marginLeft: 2,
  },
  field: {
    alignItems: "center",
    borderWidth: 0.5,
    flexDirection: "row",
    gap: 8,
  },
  iconSlot: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  input: {
    flex: 1,
    includeFontPadding: false,
    paddingVertical: 0,
    textAlignVertical: "center",
  },
  helper: {
    marginLeft: 2,
  },
});
