import React, { useCallback } from "react";
import { Plus } from "lucide-react-native";
import { FlatList, View } from "react-native";
import { Button, useTheme } from "../../../design-system";
import { FadeInView } from "./FadeInView";
import { GroupCard } from "./GroupCard";
import { HomeEmptyState } from "./HomeEmptyState";
import { SectionHeader } from "./SectionHeader";

const noGroupsImage = require("../../../../assets/remy/no_groups.png");

export function ActiveGroupsSection({
  activeCount,
  groups,
  onCreateGroup,
  onOpenGroup,
}) {
  const theme = useTheme();
  const count = activeCount ?? groups.length;
  const hasGroups = groups.length > 0;

  const renderItem = useCallback(
    ({ item, index }) => (
      <GroupCard group={item} index={index} onPress={() => onOpenGroup?.(item.id)} />
    ),
    [onOpenGroup],
  );

  return (
    <FadeInView delay={theme.motion.spring}>
      <View style={{ marginBottom: theme.space[6] }}>
        <SectionHeader title="Active groups" action={`${count} live`} />
        {hasGroups ? (
          <FlatList
            data={groups}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: theme.space[3],
              paddingRight: theme.space[4],
            }}
          />
        ) : (
          <HomeEmptyState
            image={noGroupsImage}
            action={
              <Button
                title="Add group"
                size="sm"
                onPress={onCreateGroup}
                left={
                  <Plus
                    color={theme.colors.white}
                    size={theme.space[4]}
                    strokeWidth={theme.borderWidths.medium}
                  />
                }
                style={{
                  backgroundColor: theme.semantic.secondaryAccent,
                  borderColor: theme.semantic.secondaryAccent,
                  paddingHorizontal: theme.space[5],
                }}
                textStyle={{
                  color: theme.colors.white,
                }}
              />
            }
            title="No groups yet"
            body="Create a group to start tracking shared expenses together."
          />
        )}
      </View>
    </FadeInView>
  );
}
