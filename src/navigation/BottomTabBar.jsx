import React, { useEffect } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
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
  const itemHeight = Math.round(theme.sizes.minTapTarget);
  const iconSize = Math.round(theme.space[6]);
  const ItemContainer = Platform.OS === "android" ? View : Animated.View;

  useEffect(() => {
    active.value = withSpring(isFocused ? 1 : 0, {
      damping: 16,
      stiffness: 180,
    });
  }, [active, isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    if (Platform.OS === "android") {
      return {};
    }

    return {
      transform: [{ scale: 1 + active.value * 0.04 }],
    };
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onLongPress={onLongPress}
      onPress={onPress}
      style={styles.itemPressable}
    >
      <ItemContainer
        style={[
          styles.item,
          {
            borderRadius: itemHeight / 2,
            gap: theme.space[1],
            height: itemHeight,
            minHeight: itemHeight,
            paddingHorizontal: isFocused ? theme.space[2] : 0,
          },
          Platform.OS === "android" ? null : animatedStyle,
        ]}
      >
        {isFocused ? (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: theme.semantic.surfaceStrong,
                borderRadius: itemHeight / 2,
              },
            ]}
          />
        ) : null}
        <View
          style={[
            styles.iconWrap,
            {
              backgroundColor: isFocused
                ? theme.semantic.accent
                : theme.colors.transparent,
              borderRadius: iconSize / 2,
              height: iconSize,
              overflow: "hidden",
              width: iconSize,
            },
          ]}
        >
          <Icon
            color={isFocused ? theme.semantic.accentText : theme.semantic.textMuted}
            size={theme.space[5] - 2}
            strokeWidth={theme.borderWidths.medium}
          />
        </View>
        {isFocused ? (
          <Text variant="micro" color="accent" numberOfLines={1}>
            {item.label}
          </Text>
        ) : null}
      </ItemContainer>
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
          borderTopWidth: 0,
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
            padding: theme.space[1],
            ...theme.shadows.soft,
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
    position: "relative",
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});
