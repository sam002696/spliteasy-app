import React, { useCallback } from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import { Text, useTheme } from "../../../design-system";
import { NotificationRow } from "./NotificationRow";

function EmptyNotifications({ isLoading }) {
  const theme = useTheme();

  if (isLoading) {
    return (
      <View style={{ alignItems: "center", padding: theme.space[6] }}>
        <ActivityIndicator color={theme.semantic.text} />
      </View>
    );
  }

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
        No notifications
      </Text>
      <Text variant="bodySmall" color="textMuted" align="center">
        Updates from groups, expenses, and settlements will appear here.
      </Text>
    </View>
  );
}

export function NotificationsList({
  footer,
  header,
  isLoading = false,
  notifications,
  onEndReached,
  onMarkRead,
  onRefresh,
  readingIds = {},
  refreshing = false,
}) {
  const theme = useTheme();

  const renderItem = useCallback(
    ({ item }) => (
      <NotificationRow
        notification={item}
        onPress={onMarkRead}
        reading={Boolean(readingIds[item.id])}
      />
    ),
    [onMarkRead, readingIds],
  );

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      ListHeaderComponent={header}
      ListEmptyComponent={<EmptyNotifications isLoading={isLoading} />}
      ListFooterComponent={footer}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
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
        padding: theme.space[4],
        paddingBottom: theme.space[8],
      }}
    />
  );
}
