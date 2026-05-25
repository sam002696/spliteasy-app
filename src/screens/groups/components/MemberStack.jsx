import React from "react";
import { View } from "react-native";
import { Avatar, Text, useTheme } from "../../../design-system";

export function MemberStack({ members, count }) {
  const theme = useTheme();
  const visibleMembers = members.slice(0, 4);
  const remaining = Math.max(count - visibleMembers.length, 0);

  return (
    <View style={{ alignItems: "center", flexDirection: "row" }}>
      {visibleMembers.map((member, index) => (
        <Avatar
          key={member}
          name={member}
          size="sm"
          style={{
            borderColor: theme.semantic.surfaceStrong,
            borderWidth: theme.borderWidths.medium,
            marginLeft: index === 0 ? 0 : -theme.space[2],
          }}
        />
      ))}
      {remaining > 0 ? (
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.semantic.accent,
            borderColor: theme.semantic.surfaceStrong,
            borderRadius: theme.radii.full,
            borderWidth: theme.borderWidths.medium,
            height: theme.sizes.avatarSm,
            justifyContent: "center",
            marginLeft: -theme.space[2],
            width: theme.sizes.avatarSm,
          }}
        >
          <Text variant="micro" color="accentText">
            +{remaining}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
