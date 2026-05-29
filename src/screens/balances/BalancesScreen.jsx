import React, { useCallback, useEffect, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  fetchBalances,
  fetchGroups,
  selectActiveGroupFilter,
  selectActiveBalanceFilter,
  selectBalanceCounts,
  selectBalances,
  selectBalancesState,
  selectSettlingBalanceIds,
  setActiveBalanceFilter,
  settleBalance,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import {
  BalanceFilterChips,
  BalancesHeader,
  BalancesList,
  SectionHeader,
} from "./components";
import { balanceFilters } from "./data/balancesData";
import { mapApiBalanceToListItem } from "./utils";

function BalancesIntro({ activeFilter, onFilterChange, openCount }) {
  return (
    <>
      <BalancesHeader />
      <BalanceFilterChips
        filters={balanceFilters}
        value={activeFilter}
        onChange={onFilterChange}
      />
      {activeFilter !== "settled" ? (
        <SectionHeader title="Open balances" meta={`${openCount} open`} />
      ) : null}
    </>
  );
}

export function BalancesScreen() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectBalancesState);
  const balances = useAppSelector(selectBalances);
  const counts = useAppSelector(selectBalanceCounts);
  const activeFilter = useAppSelector(selectActiveBalanceFilter);
  const activeGroupFilter = useAppSelector(selectActiveGroupFilter);
  const settlingIds = useAppSelector(selectSettlingBalanceIds);
  const visibleBalances = useMemo(
    () => balances.map(mapApiBalanceToListItem),
    [balances],
  );

  useEffect(() => {
    dispatch(fetchBalances(activeFilter));
  }, [activeFilter, dispatch]);

  const refreshBalances = useCallback(() => {
    dispatch(fetchBalances(activeFilter));
  }, [activeFilter, dispatch]);

  const handleFilterChange = useCallback(
    (filter) => {
      dispatch(setActiveBalanceFilter(filter));
    },
    [dispatch],
  );

  const handleBalanceAction = useCallback(
    async (balance) => {
      if (!balance.canSettle) {
        return;
      }

      try {
        await dispatch(
          settleBalance({
            balanceId: balance.id,
            groupId: balance.groupId,
            userId: balance.userId,
          })
        ).unwrap();
      } catch {
        return;
      }

      dispatch(fetchBalances(activeFilter));
      dispatch(fetchGroups(activeGroupFilter));
    },
    [activeFilter, activeGroupFilter, dispatch],
  );

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: theme.semantic.background,
        flex: 1,
      }}
    >
      <BalancesList
        balances={visibleBalances}
        isLoading={loading.list && visibleBalances.length === 0}
        onBalanceAction={handleBalanceAction}
        onRefresh={refreshBalances}
        refreshing={loading.list && visibleBalances.length > 0}
        settlingIds={settlingIds}
        header={
          <BalancesIntro
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            openCount={counts[activeFilter] ?? visibleBalances.length}
          />
        }
      />
    </SafeAreaView>
  );
}
