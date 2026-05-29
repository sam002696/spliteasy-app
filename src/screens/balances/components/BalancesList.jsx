import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { Text, useTheme } from "../../../design-system";
import { OpenBalanceCard } from "./OpenBalanceCard";
import { SectionHeader } from "./SectionHeader";
import { SettledBalanceRow } from "./SettledBalanceRow";

function EmptyBalances() {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: theme.semantic.surface,
        borderRadius: theme.radii.lg,
        gap: theme.space[2],
        padding: theme.space[6],
      }}
    >
      <Text variant="sectionTitle" color="text">
        Nothing here
      </Text>
      <Text variant="bodySmall" color="textMuted" align="center">
        Balances will appear as expenses and settlements are added.
      </Text>
    </View>
  );
}

export function BalancesList({ balances, header, settledBalances, showSettledOnly }) {
  const theme = useTheme();

  const renderItem = useCallback(
    ({ item, index }) => <OpenBalanceCard balance={item} index={index} />,
    [],
  );

  const footer = (
    <View style={{ gap: theme.space[3], paddingBottom: theme.space[8] }}>
      {showSettledOnly || settledBalances.length > 0 ? (
        <>
          <SectionHeader title="Settled" meta={`${settledBalances.length} cleared`} />
          {settledBalances.map((settlement) => (
            <SettledBalanceRow key={settlement.id} settlement={settlement} />
          ))}
        </>
      ) : null}
    </View>
  );

  return (
    <FlatList
      data={balances}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={header}
      ListEmptyComponent={showSettledOnly ? null : EmptyBalances}
      // ListFooterComponent={footer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: theme.space[3],
        paddingHorizontal: theme.space[4],
        paddingTop: theme.space[2],
      }}
    />
  );
}
