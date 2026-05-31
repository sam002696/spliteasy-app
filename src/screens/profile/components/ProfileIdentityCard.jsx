import React from "react";
import { PencilLine } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text, useTheme } from "../../../design-system";
import { AnimatedSection } from "./AnimatedSection";
import { selectCurrentUser, useAppSelector } from "../../../store";

export function ProfileIdentityCard() {
  const theme = useTheme();
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <AnimatedSection delay={theme.motion.fast}>
      <Card variant="black" style={{ marginBottom: theme.space[6] }}>
        <View style={[styles.root, { gap: theme.space[4] }]}>
          <Avatar
            name={currentUser.name}
            size="lg"
            textColor="accentText"
            style={{
              backgroundColor: theme.semantic.accent,
            }}
          />
          <View style={{ flex: 1, gap: theme.space[1] }}>
            <Text variant="sectionTitle" color="white" numberOfLines={1}>
              {currentUser.name}
            </Text>
            <Text variant="bodySmall" color="white60" numberOfLines={1}>
              {currentUser.email}
            </Text>
            <Text variant="label" color="white50">
              Split summary
            </Text>
          </View>
        </View>
        <Button
          title="Edit profile"
          variant="primary"
          fullWidth
          style={{ marginTop: theme.space[5] }}
          left={
            <PencilLine
              color={theme.semantic.accentText}
              size={theme.space[4]}
              strokeWidth={theme.borderWidths.medium}
            />
          }
        />
      </Card>
    </AnimatedSection>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    flexDirection: "row",
  },
});
