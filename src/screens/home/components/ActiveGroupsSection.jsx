import React, { useCallback } from "react";
import { FlatList, View } from "react-native";
import { useTheme } from "../../../design-system";
import { FadeInView } from "./FadeInView";
import { GroupCard } from "./GroupCard";
import { SectionHeader } from "./SectionHeader";

export function ActiveGroupsSection({ groups, onOpenGroup }) {
  const theme = useTheme();

  const renderItem = useCallback(
    ({ item, index }) => (
      <GroupCard group={item} index={index} onPress={() => onOpenGroup?.(item.id)} />
    ),
    [onOpenGroup],
  );

  return (
    <FadeInView delay={theme.motion.spring}>
      <View style={{ marginBottom: theme.space[6] }}>
        <SectionHeader title="Active groups" action={`${groups.length} live`} />
        <FlatList
          data={groups}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: theme.space[3],
            paddingTop: theme.space[3],
            paddingRight: theme.space[4],
          }}
        />
      </View>
    </FadeInView>
  );
}
