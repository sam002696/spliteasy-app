import React from "react";
import { Camera, ImagePlus } from "lucide-react-native";
import { View } from "react-native";
import { Button, Card, Text, useTheme } from "../../../design-system";

export function ScanPlaceholder() {
  const theme = useTheme();
  const palette = theme.addExpenseScreen;

  return (
    <Card
      variant="plain"
      style={{
        backgroundColor: palette.cardBackground,
        borderRadius: theme.radii.xl,
        marginTop: theme.space[4],
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: theme.space[4],
          paddingVertical: theme.space[6],
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: palette.scanIconBackground,
            borderRadius: theme.radii.full,
            height: theme.sizes.shutter,
            justifyContent: "center",
            width: theme.sizes.shutter,
          }}
        >
          <Camera
            color={palette.scanIcon}
            size={theme.space[8]}
            strokeWidth={theme.borderWidths.medium}
          />
        </View>
        <View style={{ alignItems: "center", gap: theme.space[1] }}>
          <Text variant="sectionTitle" color="text">
            Scan receipt
          </Text>
          <Text variant="bodySmall" color="textMuted" align="center">
            Camera and gallery flow will open from here.
          </Text>
        </View>
        <Button
          title="Open scanner"
          variant="danger"
          style={{
            backgroundColor: palette.actionBackground,
            borderColor: palette.actionBackground,
          }}
          textStyle={{ color: palette.actionText }}
          left={
            <ImagePlus
              color={palette.actionText}
              size={theme.space[4]}
              strokeWidth={theme.borderWidths.medium}
            />
          }
        />
      </View>
    </Card>
  );
}
