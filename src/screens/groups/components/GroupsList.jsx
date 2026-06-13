import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { Text, useTheme } from "../../../design-system";
import { GroupListCard } from "./GroupListCard";

function EmptyGroups({ isLoading }) {
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
        backgroundColor: theme.groupsScreen.cardBackground,
        borderRadius: theme.radii.xl,
        gap: theme.space[2],
        padding: theme.space[6],
      }}
    >
      <Text variant="sectionTitle" color="text">
        No groups found
      </Text>
      <Text variant="bodySmall" color="textMuted" align="center">
        Try a different filter or create a new group.
      </Text>
    </View>
  );
}

export function GroupsList({
  groups,
  isLoading = false,
  ListHeaderComponent,
  ListFooterComponent,
  onOpenGroup,
  onRefresh,
  refreshing = false,
}) {
  const theme = useTheme();

  const renderItem = useCallback(
    ({ item, index }) => (
      <GroupListCard
        group={item}
        index={index}
        onPress={() => onOpenGroup?.(item.id)}
      />
    ),
    [onOpenGroup],
  );

  return (
    <FlatList
      data={groups}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={<EmptyGroups isLoading={isLoading} />}
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
