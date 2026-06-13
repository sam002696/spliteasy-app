import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { Text, useTheme } from "../../../design-system";
import { OpenBalanceCard } from "./OpenBalanceCard";

function EmptyBalances({ isLoading }) {
  const theme = useTheme();

  if (isLoading) {
    return (
      <View
        style={{
          alignItems: "center",
          padding: theme.space[6],
        }}
      >
        <ActivityIndicator color={theme.semantic.text} />
      </View>
    );
  }

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: theme.balancesScreen.cardBackground,
        borderRadius: theme.radii.xl,
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

export function BalancesList({
  balances,
  header,
  isLoading = false,
  settlingIds = {},
  onBalanceAction,
  onRefresh,
  refreshing = false,
}) {
  const theme = useTheme();

  const renderItem = useCallback(
    ({ item, index }) => (
      <OpenBalanceCard
        actionLoading={Boolean(settlingIds[item.id])}
        balance={item}
        index={index}
        onActionPress={onBalanceAction}
      />
    ),
    [onBalanceAction, settlingIds],
  );

  return (
    <FlatList
      data={balances}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={header}
      ListEmptyComponent={<EmptyBalances isLoading={isLoading} />}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.semantic.text}
          />
        ) : undefined
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: theme.space[3],
        paddingBottom: theme.space[8] * 4,
        paddingHorizontal: theme.space[4],
        paddingTop: theme.space[2],
      }}
    />
  );
}
