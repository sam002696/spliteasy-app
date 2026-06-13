import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { Text, useTheme } from "../../../design-system";
import { InvitationCard } from "./InvitationCard";

function EmptyRequests({ isLoading }) {
  const theme = useTheme();
  const palette = theme.groupRequestsScreen;

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
        backgroundColor: palette.cardBackground,
        borderRadius: theme.radii.xl,
        gap: theme.space[2],
        padding: theme.space[6],
      }}
    >
      <Text variant="sectionTitle" color="text">
        No requests
      </Text>
      <Text variant="bodySmall" color="textMuted" align="center">
        New group invitations will appear here.
      </Text>
    </View>
  );
}

export function GroupRequestsList({
  acceptingById = {},
  header,
  isLoading = false,
  onAccept,
  onRefresh,
  onReject,
  refreshing = false,
  rejectingById = {},
  requests,
}) {
  const theme = useTheme();

  const renderItem = useCallback(
    ({ item }) => (
      <InvitationCard
        accepting={Boolean(acceptingById[item.id])}
        invitation={item}
        onAccept={onAccept}
        onReject={onReject}
        rejecting={Boolean(rejectingById[item.id])}
      />
    ),
    [acceptingById, onAccept, onReject, rejectingById],
  );

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      ListHeaderComponent={header}
      ListEmptyComponent={<EmptyRequests isLoading={isLoading} />}
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
