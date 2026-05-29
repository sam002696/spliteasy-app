import React, { useCallback, useMemo, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  acceptInvitation,
  fetchGroups,
  fetchPendingInvitations,
  groupFilters,
  rejectInvitation,
  selectInvitations,
  selectPendingInvitations,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { GroupRequestsHeader, GroupRequestsList } from "./components";
import { mapInvitationToRequest } from "./utils";

function GroupRequestsIntro({ onBack }) {
  return <GroupRequestsHeader onBack={onBack} />;
}

export function GroupRequestsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pendingInvitations = useAppSelector(selectPendingInvitations);
  const { loading } = useAppSelector(selectInvitations);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const requests = useMemo(
    () => pendingInvitations.map(mapInvitationToRequest),
    [pendingInvitations],
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchPendingInvitations());
    }, [dispatch]),
  );

  const refreshRequests = useCallback(async () => {
    setIsRefreshing(true);

    try {
      await dispatch(fetchPendingInvitations());
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch]);

  const acceptRequest = useCallback(
    async (invitationId) => {
      const result = await dispatch(acceptInvitation(invitationId));

      if (acceptInvitation.fulfilled.match(result)) {
        dispatch(fetchGroups(groupFilters.all));
      }
    },
    [dispatch],
  );

  const rejectRequest = useCallback(
    async (invitationId) => {
      await dispatch(rejectInvitation(invitationId));
    },
    [dispatch],
  );

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: theme.semantic.background,
        flex: 1,
      }}
    >
      <GroupRequestsList
        acceptingById={loading.acceptById}
        header={<GroupRequestsIntro onBack={() => router.back()} />}
        isLoading={loading.pending && requests.length === 0}
        onAccept={acceptRequest}
        onRefresh={refreshRequests}
        onReject={rejectRequest}
        refreshing={isRefreshing}
        rejectingById={loading.rejectById}
        requests={requests}
      />
    </SafeAreaView>
  );
}
