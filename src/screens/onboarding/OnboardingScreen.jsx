import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight } from "lucide-react-native";
import { Button, Text, useTheme } from "../../design-system";
import { setStoredOnboardingCompleted } from "../../storage/onboardingStorage";

const slides = [
  {
    id: "plan",
    image: require("../../../assets/onboarding/onboarding1.png"),
    eyebrow: "Split smarter",
    title: "Track every shared cost without the math headache",
    body: "Create groups, add expenses, and let SplitEasy keep everyone’s balance clear.",
  },
  {
    id: "settle",
    image: require("../../../assets/onboarding/onboarding2.png"),
    eyebrow: "Settle faster",
    title: "Remind, settle, and stay in sync with your people",
    body: "See who owes what, send friendly reminders, and keep group activity easy to follow.",
  },
];

function OnboardingSlide({ item, width }) {
  const theme = useTheme();
  const imageStageSize = Math.min(width * 1.05, 410);
  const imageSize = imageStageSize * 1.5;

  return (
    <View style={[styles.slide, { width }]}>
      <View
        style={[
          styles.imageStage,
          {
            borderRadius: theme.radii.full,
            height: imageStageSize,
            width: imageStageSize,
          },
        ]}
      >
        <Image
          source={item.image}
          resizeMode="contain"
          style={{
            height: imageSize,
            width: imageSize,
          }}
        />
      </View>
      <View style={[styles.copy, { gap: theme.space[3] }]}>
        <Text
          variant="micro"
          color="textMuted"
          uppercase
          align="center"
          style={styles.eyebrow}
        >
          {item.eyebrow}
        </Text>
        <Text variant="screenTitle" color="text" align="center">
          {item.title}
        </Text>
        <Text variant="body" color="textMuted" align="center">
          {item.body}
        </Text>
      </View>
    </View>
  );
}

function PaginationDots({ activeIndex }) {
  const theme = useTheme();

  return (
    <View style={[styles.dots, { gap: theme.space[2] }]}>
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <View
            key={slide.id}
            style={{
              backgroundColor: isActive
                ? theme.semantic.surfaceStrong
                : theme.semantic.border,
              borderRadius: theme.radii.full,
              height: theme.space[2],
              width: isActive ? theme.space[6] : theme.space[2],
            }}
          />
        );
      })}
    </View>
  );
}

export function OnboardingScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === slides.length - 1;

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 60,
    }),
    [],
  );

  const completeOnboarding = async () => {
    await setStoredOnboardingCompleted();
    router.replace("/login");
  };

  const goNext = () => {
    if (isLastSlide) {
      completeOnboarding();
      return;
    }

    listRef.current?.scrollToIndex({
      animated: true,
      index: activeIndex + 1,
    });
  };

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    const nextIndex = viewableItems[0]?.index;

    if (typeof nextIndex === "number") {
      setActiveIndex(nextIndex);
    }
  }).current;

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={[
        styles.safeArea,
        {
          backgroundColor: theme.semantic.background,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            paddingHorizontal: theme.space[5],
            paddingTop: theme.space[2],
          },
        ]}
      >
        <Text variant="micro" color="textMuted" uppercase style={styles.brand}>
          Spliteasy
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={completeOnboarding}
          style={({ pressed }) => [
            styles.skipButton,
            {
              opacity: pressed ? 0.68 : 1,
              paddingHorizontal: theme.space[2],
              paddingVertical: theme.space[1],
            },
          ]}
        >
          <Text variant="field" color="textMuted">
            Skip
          </Text>
        </Pressable>
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        keyExtractor={(item) => item.id}
        pagingEnabled
        renderItem={({ item }) => <OnboardingSlide item={item} width={width} />}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={handleViewableItemsChanged}
      />

      <View
        style={[
          styles.footer,
          {
            gap: theme.space[4],
            paddingHorizontal: theme.space[5],
            paddingBottom: theme.space[3],
          },
        ]}
      >
        <PaginationDots activeIndex={activeIndex} />
        <Button
          title={isLastSlide ? "Get started" : "Next"}
          size="lg"
          fullWidth
          onPress={goNext}
          right={
            <ArrowRight
              color={theme.semantic.accentText}
              size={theme.space[5]}
              strokeWidth={theme.borderWidths.medium}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  brand: {
    letterSpacing: 4,
  },
  copy: {
    paddingHorizontal: 28,
  },
  dots: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  eyebrow: {
    letterSpacing: 3,
  },
  footer: {},
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageStage: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  safeArea: {
    flex: 1,
  },
  skipButton: {},
  slide: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
