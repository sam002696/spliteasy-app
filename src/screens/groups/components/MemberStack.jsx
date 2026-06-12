import React from "react";
import { View } from "react-native";
import { Avatar, Text, useTheme } from "../../../design-system";

export function MemberStack({ members, count, palettes }) {
  const theme = useTheme();
  const visibleMembers = members.slice(0, 4);
  const remaining =
    visibleMembers.length > 0 ? Math.max(count - visibleMembers.length, 0) : 0;
  const colors = palettes || [
    {
      background: theme.semantic.accent,
      text: theme.semantic.accentText,
    },
  ];

  return (
    <View style={{ alignItems: "center", flexDirection: "row" }}>
      {visibleMembers.map((member, index) => {
        const palette = colors[index % colors.length];

        return (
          <Avatar
            key={member}
            name={member}
            size="sm"
            style={{
              backgroundColor: palette.background,
              borderColor: theme.colors.white,
              borderWidth: theme.borderWidths.medium,
              marginLeft: index === 0 ? 0 : -theme.space[2],
            }}
            textColor={palette.text}
          />
        );
      })}
      {remaining > 0 ? (
        <View
          style={{
            alignItems: "center",
            backgroundColor: colors[0].background,
            borderColor: theme.colors.white,
            borderRadius: theme.radii.full,
            borderWidth: theme.borderWidths.medium,
            height: theme.sizes.avatarSm,
            justifyContent: "center",
            marginLeft: -theme.space[2],
            width: theme.sizes.avatarSm,
          }}
        >
          <Text variant="micro" color={colors[0].text}>
            +{remaining}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
