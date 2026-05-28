import React, { useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { X } from "lucide-react-native";
import { Text, useTheme } from "../../design-system";
import { toastVariants } from "./toastVariants";

const ENTER_DURATION = 220;
const EXIT_DURATION = 180;

export function ToastItem({ toast, onClose }) {
  const theme = useTheme();
  const translateY = useRef(new Animated.Value(96)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);
  const isClosingRef = useRef(false);
  const variant = toastVariants[toast.type] || toastVariants.info;
  const Icon = variant.icon;

  const closeToast = () => {
    if (isClosingRef.current) {
      return;
    }

    isClosingRef.current = true;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    Animated.parallel([
      Animated.timing(translateY, {
        duration: EXIT_DURATION,
        toValue: 96,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        duration: EXIT_DURATION,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start(() => onClose(toast.id));
  };

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        damping: 18,
        mass: 0.8,
        stiffness: 190,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        duration: ENTER_DURATION,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    if (toast.duration !== 0) {
      timeoutRef.current = setTimeout(closeToast, toast.duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: variant.backgroundColor,
          borderRadius: theme.radii.lg,
          flexDirection: "row",
          gap: theme.space[2],
          minHeight: 54,
          paddingLeft: theme.space[3],
          paddingRight: theme.space[2],
          paddingVertical: theme.space[2],
          ...theme.shadows.raised,
        }}
      >
        <Icon color={theme.colors.white} size={21} strokeWidth={3} />

        <View style={{ flex: 1, gap: toast.title ? 2 : 0 }}>
          {toast.title ? (
            <Text variant="micro" color="white" uppercase>
              {toast.title}
            </Text>
          ) : null}
          <Text
            variant="field"
            color="white"
            numberOfLines={3}
            style={{
              fontSize: 15,
              lineHeight: 20,
            }}
          >
            {toast.message}
          </Text>
        </View>

        <Pressable
          accessibilityLabel="Dismiss notification"
          accessibilityRole="button"
          hitSlop={10}
          onPress={closeToast}
          style={({ pressed }) => ({
            opacity: pressed ? 0.62 : 1,
            padding: 6,
          })}
        >
          <X color={theme.colors.white} size={22} strokeWidth={2.2} />
        </Pressable>
      </View>
    </Animated.View>
  );
}
