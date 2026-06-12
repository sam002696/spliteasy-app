import React from "react";
import { View } from "react-native";
import { useTheme } from "../../../design-system";
import { FadeInView } from "./FadeInView";
import { SectionHeader } from "./SectionHeader";

export function RecentActivitySection() {
  const theme = useTheme();

  return (
    <FadeInView delay={theme.motion.screen}>
      <View style={{ paddingBottom: theme.space[3] }}>
        <SectionHeader title="Recent activity" action="View all" />
      </View>
    </FadeInView>
  );
}
