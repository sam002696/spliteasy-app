import React from "react";
import { ArrowRight, X } from "lucide-react-native";
import { View } from "react-native";
import { Button, useTheme } from "../../../design-system";

export function CreateGroupFooter({ canCreate, onCancel, onCreate }) {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: theme.space[3] }}>
      <Button
        title="Cancel"
        variant="neutral"
        style={{ flex: 1 }}
        left={<X color={theme.semantic.text} size={theme.space[4]} />}
        onPress={onCancel}
      />
      <Button
        title="Create"
        disabled={!canCreate}
        style={{ flex: 1 }}
        right={<ArrowRight color={theme.semantic.accentText} size={theme.space[4]} />}
        onPress={onCreate}
      />
    </View>
  );
}
