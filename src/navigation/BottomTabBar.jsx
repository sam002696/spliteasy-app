import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, useTheme } from "../design-system";
import { tabItems } from "./tabItems";

function BottomTabItem({ item, isFocused, onPress, onLongPress }) {
  const theme = useTheme();
  const active = useSharedValue(isFocused ? 1 : 0);
  const Icon = item.icon;

  useEffect(() => {
    active.value = withSpring(isFocused ? 1 : 0, {
      damping: 16,
      stiffness: 180,
    });
  }, [active, isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + active.value * 0.04 }],
  }));

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onLongPress={onLongPress}
      onPress={onPress}
      style={styles.itemPressable}
    >
      <Animated.View
        style={[
          styles.item,
          {
            backgroundColor: isFocused ? theme.semantic.surfaceStrong : theme.colors.transparent,
            borderRadius: theme.radii.full,
          minHeight: theme.sizes.minTapTarget,
          paddingHorizontal: theme.space[3],
          gap: theme.space[1],
        },
          animatedStyle,
        ]}
      >
        <Icon
          color={isFocused ? theme.semantic.accent : theme.semantic.textMuted}
          size={theme.space[5]}
          strokeWidth={theme.borderWidths.medium}
        />
        {isFocused ? (
          <Text variant="micro" color="accent" numberOfLines={1}>
            {item.label}
          </Text>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

export function BottomTabBar({ state, descriptors, navigation }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.semantic.background,
          borderTopColor: theme.semantic.border,
          borderTopWidth: theme.borderWidths.hairline,
          paddingBottom: Math.max(insets.bottom, theme.space[3]),
          paddingHorizontal: theme.space[4],
          paddingTop: theme.space[3],
        },
      ]}
    >
      <View
        style={[
          styles.nav,
          {
            backgroundColor: theme.colors.white,
            borderColor: theme.semantic.border,
            borderRadius: theme.radii.full,
            borderWidth: theme.borderWidths.hairline,
            padding: theme.space[2],
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const descriptor = descriptors[route.key];
          const item = tabItems.find((entry) => entry.name === route.name);
          const isFocused = state.index === index;

          if (!item) {
            return null;
          }

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <BottomTabItem
              isFocused={isFocused}
              item={{
                ...item,
                label: descriptor.options.title || item.label,
              }}
              key={route.key}
              onLongPress={onLongPress}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  nav: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemPressable: {
    flex: 1,
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});
