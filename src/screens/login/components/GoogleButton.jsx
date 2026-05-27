import React from "react";
import { Pressable, Text as RNText, View } from "react-native";
import { Text, useTheme } from "../../../design-system";

function GoogleMark() {
  return (
    <RNText
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={{
        fontSize: 30,
        fontWeight: "700",
        lineHeight: 34,
      }}
    >
      <RNText style={{ color: "#4285F4" }}>G</RNText>
    </RNText>
  );
}

export function GoogleButton({ onPress }) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityLabel="Continue with Google"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: "center",
        backgroundColor: theme.semantic.card,
        borderColor: theme.rgba.white10,
        borderRadius: theme.radii.xl,
        borderWidth: theme.borderWidths.hairline,
        flexDirection: "row",
        gap: theme.space[3],
        height: 74,
        justifyContent: "center",
        opacity: pressed ? 0.78 : 1,
        paddingHorizontal: theme.space[5],
      })}
    >
      <View
        style={{
          height: 34,
          justifyContent: "center",
          width: 34,
        }}
      >
        <GoogleMark />
      </View>
      <Text
        variant="field"
        color="text"
        style={{
          fontSize: 20,
          lineHeight: 24,
        }}
      >
        Google
      </Text>
    </Pressable>
  );
}
