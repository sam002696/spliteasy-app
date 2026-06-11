import React, { useCallback } from "react";
import { Plus } from "lucide-react-native";
import { FlatList, View } from "react-native";
import { Button, Card, Text, useTheme } from "../../../design-system";
import { FadeInView } from "./FadeInView";
import { GroupCard } from "./GroupCard";
import { SectionHeader } from "./SectionHeader";

function EmptyGroupsCard({ onCreateGroup }) {
  const theme = useTheme();

  return (
    <Card
      variant="plain"
      style={{
        borderRadius: theme.radii.xl,
        paddingHorizontal: theme.space[5],
        paddingVertical: theme.space[6],
      }}
    >
      <View style={{ gap: theme.space[5] }}>
        <View style={{ gap: theme.space[3] }}>
          <Text variant="cardTitle" color="text">
            Looking for a crew?
          </Text>
          <Text variant="body" color="textMuted">
            Create a trip, roommate or dinner group and split expenses together.
          </Text>
        </View>
        <Button
          title="Create group"
          size="md"
          onPress={onCreateGroup}
          left={
            <Plus
              color={theme.colors.white}
              size={theme.space[4]}
              strokeWidth={theme.borderWidths.medium}
            />
          }
          style={{
            alignSelf: "flex-start",
            backgroundColor: theme.semantic.secondaryAccent,
            borderColor: theme.semantic.secondaryAccent,
            paddingHorizontal: theme.space[5],
          }}
          textStyle={{
            color: theme.colors.white,
          }}
        />
      </View>
    </Card>
  );
}

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
        <SectionHeader title="Active groups" action={hasGroups ? `${count} live` : null} />
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
          <EmptyGroupsCard onCreateGroup={onCreateGroup} />
        )}
      </View>
    </FadeInView>
  );
}
