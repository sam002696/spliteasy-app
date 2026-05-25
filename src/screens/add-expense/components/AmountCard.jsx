import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Card, Text, useTheme } from "../../../design-system";

export function AmountCard({ amount, onAmountChange }) {
  const theme = useTheme();
  const amountHeight = theme.typography.heroAmount.lineHeight + theme.space[4];

  return (
    <Card variant="limeHero" style={{ marginBottom: theme.space[4] }}>
      <Text variant="micro" color="black60" uppercase>
        Amount
      </Text>
      <View
        style={[
          styles.amountRow,
          {
            gap: theme.space[2],
            height: amountHeight,
          },
        ]}
      >
        <Text
          variant="heroAmount"
          color="accentText"
          style={{
            fontFamily: theme.fontFamilies.bodyFallback,
            includeFontPadding: false,
            lineHeight: theme.typography.heroAmount.lineHeight,
            transform: [{ translateY: theme.space[2] }],
          }}
        >
          ৳
        </Text>
        <TextInput
          value={amount}
          onChangeText={onAmountChange}
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor={theme.rgba.black40}
          style={[
            theme.typography.heroAmount,
            {
              color: theme.semantic.accentText,
              flex: 1,
              height: amountHeight,
              includeFontPadding: false,
              padding: 0,
              textAlignVertical: "center",
            },
          ]}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  amountRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
