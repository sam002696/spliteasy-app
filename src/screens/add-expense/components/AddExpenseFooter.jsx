import React from "react";
import { ArrowRight } from "lucide-react-native";
import { Button, useTheme } from "../../../design-system";

export function AddExpenseFooter({ canSave, loading = false, onSave }) {
  const theme = useTheme();
  const palette = theme.addExpenseScreen;

  return (
    <Button
      title="Save expense"
      variant="danger"
      disabled={!canSave}
      fullWidth
      loading={loading}
      size="lg"
      style={{
        backgroundColor: palette.actionBackground,
        borderColor: palette.actionBackground,
      }}
      textStyle={{ color: palette.actionText }}
      right={
        <ArrowRight
          color={palette.actionText}
          size={theme.space[4]}
          strokeWidth={theme.borderWidths.medium}
        />
      }
      onPress={onSave}
    />
  );
}
