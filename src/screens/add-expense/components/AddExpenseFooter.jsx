import React from "react";
import { Save } from "lucide-react-native";
import { Button, useTheme } from "../../../design-system";

export function AddExpenseFooter({ canSave, loading = false, onSave }) {
  const theme = useTheme();

  return (
    <Button
      title="Save expense"
      disabled={!canSave}
      fullWidth
      loading={loading}
      size="lg"
      left={
        <Save
          color={theme.semantic.accentText}
          size={theme.space[4]}
          strokeWidth={theme.borderWidths.medium}
        />
      }
      onPress={onSave}
    />
  );
}
