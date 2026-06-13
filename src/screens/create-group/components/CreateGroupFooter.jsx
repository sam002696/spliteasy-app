import React from "react";
import { ArrowRight, X } from "lucide-react-native";
import { View } from "react-native";
import { Button, useTheme } from "../../../design-system";

export function CreateGroupFooter({
  canCreate,
  loading = false,
  onCancel,
  onCreate,
}) {
  const theme = useTheme();
  const palette = theme.createGroupScreen;

  return (
    <View
      style={{
        flexDirection: "row",
        gap: theme.space[3],
        marginTop: theme.space[2],
      }}
    >
      <Button
        title="Cancel"
        variant="ghost"
        style={{ flex: 1 }}
        textStyle={{ color: theme.semantic.textMuted }}
        left={<X color={theme.semantic.textMuted} size={theme.space[4]} />}
        onPress={onCancel}
      />
      <Button
        title="Create group"
        disabled={!canCreate}
        loading={loading}
        style={{
          backgroundColor: palette.footerButtonBackground,
          borderColor: palette.footerButtonBackground,
          flex: 1.45,
        }}
        textStyle={{ color: palette.footerButtonText }}
        right={
          <ArrowRight color={palette.footerButtonText} size={theme.space[4]} />
        }
        onPress={onCreate}
      />
    </View>
  );
}
