import React from "react";
import { PencilLine } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "../../../design-system";
import { AnimatedSection } from "./AnimatedSection";
import { selectCurrentUser, useAppSelector } from "../../../store";

function initialsFor(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function ProfileIdentityCard() {
  const theme = useTheme();
  const currentUser = useAppSelector(selectCurrentUser);
  const initials = initialsFor(currentUser?.name || currentUser?.email);
  const palette = theme.profile;

  if (!currentUser) {
    return null;
  }

  return (
    <AnimatedSection delay={theme.motion.fast}>
      <Card
        padded={false}
        style={{
          backgroundColor: palette.identityBackground,
          borderRadius: theme.radii.xl,
          marginBottom: theme.space[6],
        }}
      >
        <View
          pointerEvents="none"
          style={[
            styles.orb,
            styles.orbTop,
            { backgroundColor: palette.orbPrimary },
          ]}
        />
        <View
          pointerEvents="none"
          style={[
            styles.orb,
            styles.orbBottom,
            { backgroundColor: palette.orbSecondary },
          ]}
        />
        <View
          style={[
            styles.content,
            {
              gap: theme.space[5],
              paddingHorizontal: theme.space[5],
              paddingVertical: theme.space[6],
            },
          ]}
        >
          <View style={[styles.root, { gap: theme.space[4] }]}>
            <View
              accessibilityLabel={currentUser.name}
              style={[
                styles.avatar,
                {
                  backgroundColor: palette.avatarBackground,
                  height: theme.sizes.avatarLg,
                  width: theme.sizes.avatarLg,
                },
              ]}
            >
              <Text variant="sectionTitle" color={theme.colors.white}>
                {initials}
              </Text>
            </View>
            <View style={{ flex: 1, gap: theme.space[1] }}>
              <Text
                adjustsFontSizeToFit
                minimumFontScale={0.82}
                numberOfLines={1}
                variant="cardTitle"
                color="text"
              >
                {currentUser.name}
              </Text>
              <Text variant="body" color="textMuted" numberOfLines={1}>
                {currentUser.email}
              </Text>
            </View>
          </View>
          <Button
            title="Edit profile"
            fullWidth
            size="lg"
            style={{
              backgroundColor: palette.actionBackground,
              borderColor: palette.actionBackground,
              gap: theme.space[2],
            }}
            textStyle={{ color: palette.actionText }}
            left={
              <PencilLine
                color={palette.actionText}
                size={theme.space[4]}
                strokeWidth={theme.borderWidths.medium}
              />
            }
          />
        </View>
      </Card>
    </AnimatedSection>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    borderRadius: 999,
    justifyContent: "center",
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
  orb: {
    borderRadius: 999,
    position: "absolute",
  },
  orbBottom: {
    bottom: -36,
    height: 96,
    left: 32,
    width: 96,
  },
  orbTop: {
    height: 112,
    right: -20,
    top: -20,
    width: 112,
  },
  root: {
    alignItems: "center",
    flexDirection: "row",
  },
});
