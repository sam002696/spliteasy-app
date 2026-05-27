import React from "react";
import { ChevronLeft } from "lucide-react-native";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { IconButton, Text, useTheme } from "../../../design-system";

export function LoginHeader() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        minHeight: theme.sizes.iconButton,
      }}
    >
      <IconButton
        label="Go back"
        tone="ghost"
        icon={(color) => <ChevronLeft color={color} size={22} strokeWidth={2.2} />}
        onPress={() => router.back()}
        style={{
          backgroundColor: theme.rgba.white10,
          borderColor: theme.rgba.white10,
          borderWidth: theme.borderWidths.hairline,
          left: 0,
          position: "absolute",
        }}
      />
      <Text
        variant="micro"
        color="textMuted"
        uppercase
        style={{
          letterSpacing: 3,
          paddingLeft: 3,
        }}
      >
        SplitEasy
      </Text>
    </View>
  );
}
