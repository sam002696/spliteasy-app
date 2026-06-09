import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

export function HomeEmptyState({ action, body, image, title }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: theme.semantic.card,
          borderColor: theme.semantic.border,
          borderRadius: theme.radii.lg,
          borderWidth: theme.borderWidths.hairline,
          gap: theme.space[3],
          paddingHorizontal: theme.space[5],
          paddingVertical: theme.space[4],
        },
      ]}
    >
      <View style={styles.imageViewport}>
        <Image source={image} resizeMode="contain" style={styles.image} />
      </View>
      {action}
      <View style={{ gap: theme.space[2] }}>
        <Text variant="sectionTitle" color="text" align="center">
          {title}
        </Text>
        <Text variant="bodySmall" color="textMuted" align="center">
          {body}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1668 / 2420,
    height: 300,
    top: -42,
  },
  imageViewport: {
    alignItems: "center",
    height: 170,
    justifyContent: "flex-start",
    maxWidth: "100%",
    overflow: "hidden",
    width: 220,
  },
  root: {
    alignItems: "center",
  },
});
