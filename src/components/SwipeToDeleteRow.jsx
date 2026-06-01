import React, { useMemo, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Trash2 } from "lucide-react-native";
import { Text, useTheme } from "../design-system";

const ACTION_WIDTH = 96;

export function SwipeToDeleteRow({
  children,
  deleting = false,
  disabled = false,
  onDelete,
}) {
  const theme = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const currentX = useRef(0);

  const animateTo = (value) => {
    currentX.current = value;
    Animated.spring(translateX, {
      damping: 18,
      stiffness: 220,
      toValue: value,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) =>
          !disabled &&
          Math.abs(gesture.dx) > theme.space[2] &&
          Math.abs(gesture.dx) > Math.abs(gesture.dy),
        onPanResponderMove: (_, gesture) => {
          const nextX = Math.max(
            -ACTION_WIDTH,
            Math.min(0, currentX.current + gesture.dx),
          );
          translateX.setValue(nextX);
        },
        onPanResponderRelease: (_, gesture) => {
          const shouldOpen =
            currentX.current + gesture.dx < -ACTION_WIDTH / 2 ||
            gesture.vx < -0.45;

          animateTo(shouldOpen ? -ACTION_WIDTH : 0);
        },
        onPanResponderTerminate: () => {
          animateTo(0);
        },
      }),
    [disabled, theme.space, translateX],
  );

  const deleteRow = async () => {
    if (disabled || deleting) {
      return;
    }

    await onDelete?.();
    animateTo(0);
  };

  return (
    <View style={styles.root}>
      <Pressable
        accessibilityLabel="Delete"
        accessibilityRole="button"
        disabled={disabled || deleting}
        onPress={deleteRow}
        style={({ pressed }) => [
          styles.action,
          {
            backgroundColor: theme.semantic.danger,
            borderRadius: theme.radii.md,
            opacity: pressed ? 0.82 : 1,
            width: ACTION_WIDTH,
          },
        ]}
      >
        {deleting ? (
          <ActivityIndicator color={theme.colors.white} />
        ) : (
          <>
            <Trash2
              color={theme.colors.white}
              size={theme.space[5]}
              strokeWidth={theme.borderWidths.medium}
            />
            <Text variant="micro" color="white">
              Delete
            </Text>
          </>
        )}
      </Pressable>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.content,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    alignItems: "center",
    bottom: 0,
    gap: 4,
    justifyContent: "center",
    position: "absolute",
    right: 0,
    top: 0,
  },
  content: {
    position: "relative",
  },
  root: {
    overflow: "hidden",
  },
});
