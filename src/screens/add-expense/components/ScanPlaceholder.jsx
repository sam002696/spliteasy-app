import React from "react";
import { Camera, ImagePlus } from "lucide-react-native";
import { View } from "react-native";
import { Button, Card, Text, useTheme } from "../../../design-system";

export function ScanPlaceholder() {
  const theme = useTheme();

  return (
    <Card variant="black" style={{ marginTop: theme.space[4] }}>
      <View style={{ alignItems: "center", gap: theme.space[4], paddingVertical: theme.space[6] }}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.semantic.accent,
            borderRadius: theme.radii.full,
            height: theme.sizes.shutter,
            justifyContent: "center",
            width: theme.sizes.shutter,
          }}
        >
          <Camera
            color={theme.semantic.accentText}
            size={theme.space[8]}
            strokeWidth={theme.borderWidths.medium}
          />
        </View>
        <View style={{ alignItems: "center", gap: theme.space[1] }}>
          <Text variant="sectionTitle" color="white">
            Scan receipt
          </Text>
          <Text variant="bodySmall" color="white60" align="center">
            Camera and gallery flow will open from here.
          </Text>
        </View>
        <Button
          title="Open scanner"
          variant="primary"
          left={
            <ImagePlus
              color={theme.semantic.accentText}
              size={theme.space[4]}
              strokeWidth={theme.borderWidths.medium}
            />
          }
        />
      </View>
    </Card>
  );
}
