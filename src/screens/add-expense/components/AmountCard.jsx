import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ReceiptText } from "lucide-react-native";
import { Card, Text, useTheme } from "../../../design-system";

export function AmountCard({ amount, onAmountChange }) {
  const theme = useTheme();
  const palette = theme.addExpenseScreen;
  const amountHeight = theme.typography.cardAmount.lineHeight + theme.space[4];

  return (
    <Card
      variant="plain"
      style={{
        backgroundColor: palette.cardBackground,
        borderRadius: theme.radii.xl,
        marginBottom: theme.space[5],
      }}
    >
      <View style={[styles.header, { gap: theme.space[3] }]}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: palette.amountIconBackground,
            borderRadius: theme.radii.md,
            height: theme.sizes.iconButton,
            justifyContent: "center",
            width: theme.sizes.iconButton,
          }}
        >
          <ReceiptText
            color={palette.amountIcon}
            size={theme.space[5]}
            strokeWidth={theme.borderWidths.medium}
          />
        </View>
        <View style={{ flex: 1, gap: theme.space[1] }}>
          <Text variant="field" color="textMuted" uppercase>
            Amount
          </Text>
          <Text variant="bodySmall" color="textMuted">
            Enter the total expense amount
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.amountRow,
          {
            gap: theme.space[2],
            height: amountHeight,
            marginTop: theme.space[4],
          },
        ]}
      >
        <Text
          variant="cardAmount"
          color={palette.amountText}
          style={{
            fontFamily: theme.fontFamilies.bodyFallback,
            includeFontPadding: false,
            lineHeight: theme.typography.cardAmount.lineHeight,
          }}
        >
          ৳
        </Text>
        <TextInput
          value={amount}
          onChangeText={onAmountChange}
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor={theme.semantic.textMuted}
          style={[
            theme.typography.cardAmount,
            {
              color: palette.amountText,
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
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
});
