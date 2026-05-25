import React from "react";
import { ReceiptText, UserRoundCheck, WalletCards } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "../../../design-system";
import { AnimatedSection } from "./AnimatedSection";

const summaryItems = [
  {
    key: "activeGroups",
    label: "Active",
    icon: ReceiptText,
  },
  {
    key: "totalMembers",
    label: "Members",
    icon: UserRoundCheck,
  },
  {
    key: "netBalance",
    label: "Net",
    icon: WalletCards,
  },
];

export function GroupsSummary({ stats }) {
  const theme = useTheme();

  return (
    <AnimatedSection delay={theme.motion.fast}>
      <View style={[styles.root, { gap: theme.space[3], marginBottom: theme.space[6] }]}>
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.key} variant="neutral" style={styles.card}>
              <View
                style={[
                  styles.iconWrap,
                  {
                    backgroundColor: theme.semantic.surfaceStrong,
                    borderRadius: theme.radii.full,
                    height: theme.sizes.minTapTarget,
                    marginBottom: theme.space[3],
                    width: theme.sizes.minTapTarget,
                  },
                ]}
              >
                <Icon
                  color={theme.semantic.accent}
                  size={theme.space[5]}
                  strokeWidth={theme.borderWidths.medium}
                />
              </View>
              <Text variant="sectionTitle" color="text" numberOfLines={1}>
                {stats[item.key]}
              </Text>
              <Text variant="label" color="textMuted">
                {item.label}
              </Text>
            </Card>
          );
        })}
      </View>
    </AnimatedSection>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    flexDirection: "row",
  },
});
