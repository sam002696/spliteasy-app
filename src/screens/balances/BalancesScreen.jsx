import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../design-system";
import {
  BalanceFilterChips,
  BalanceSummaryCard,
  BalancesHeader,
  BalancesList,
  SectionHeader,
} from "./components";
import {
  balanceFilters,
  balanceSummary,
  openBalances,
  settledBalances,
} from "./data/balancesData";

function BalancesIntro({ activeFilter, onFilterChange, openCount }) {
  return (
    <>
      <BalancesHeader />
      <BalanceSummaryCard summary={balanceSummary} />
      <BalanceFilterChips filters={balanceFilters} value={activeFilter} onChange={onFilterChange} />
      {activeFilter !== "settled" ? <SectionHeader title="Open balances" meta={`${openCount} open`} /> : null}
    </>
  );
}

export function BalancesScreen() {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState("open");
  const visibleBalances = useMemo(() => {
    if (activeFilter === "open") {
      return openBalances;
    }

    if (activeFilter === "settled") {
      return [];
    }

    return openBalances.filter((balance) => balance.tone === activeFilter);
  }, [activeFilter]);

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
        settledBalances={settledBalances}
        showSettledOnly={activeFilter === "settled"}
        header={
          <BalancesIntro
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            openCount={visibleBalances.length}
          />
        }
      />
    </SafeAreaView>
  );
}
