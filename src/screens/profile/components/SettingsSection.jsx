import React from "react";
import { View } from "react-native";
import { Card, Text, useTheme } from "../../../design-system";
import { AnimatedSection } from "./AnimatedSection";
import { SettingsRow } from "./SettingsRow";

export function SettingsSection({
  title,
  rows,
  delay = 0,
  disabledRowId,
  onRowPress,
}) {
  const theme = useTheme();

  return (
    <AnimatedSection delay={delay}>
      <View style={{ gap: theme.space[3], marginBottom: theme.space[6] }}>
        <Text variant="sectionTitle" color="text">
          {title}
        </Text>
        <Card
          padded={false}
          style={{
            backgroundColor: theme.profile.rowBackground,
            borderRadius: theme.radii.xl,
          }}
        >
          {rows.map((row) => (
            <SettingsRow
              disabled={disabledRowId === row.id}
              isLast={row.id === rows[rows.length - 1]?.id}
              key={row.id}
              onPress={() => onRowPress?.(row)}
              row={row}
            />
          ))}
        </Card>
      </View>
    </AnimatedSection>
  );
}
