import {
  borderWidths,
  colors,
  fontFamilies,
  fontWeights,
  motion,
  radii,
  rgba,
  shadows,
  sizes,
  space,
  typography,
  zIndices,
} from "./tokens";

function scaleValue(value, scale) {
  if (typeof value !== "number") {
    return value;
  }

  if (value === 0 || value === 999) {
    return value;
  }

  return Math.round(value * scale * 2) / 2;
}

function scaleTokenMap(tokenMap, scale) {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(tokenMap).map(([key, value]) => [
        key,
        scaleValue(value, scale),
      ]),
    ),
  );
}

function scaleTypographyTokens(scale) {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(typography).map(([key, value]) => [
        key,
        Object.freeze({
          ...value,
          fontSize: scaleValue(value.fontSize, scale),
          lineHeight: scaleValue(value.lineHeight, scale),
        }),
      ]),
    ),
  );
}

const semanticLight = Object.freeze({
  background: colors.offWhite,
  surface: colors.cream,
  surfaceStrong: colors.nearBlack,
  card: colors.white,
  text: colors.nearBlack,
  textInverse: colors.white,
  textMuted: colors.taupe,
  accent: colors.yellow,
  accentText: colors.nearBlack,
  secondaryAccent: colors.orange,
  danger: colors.red,
  border: rgba.black08,
  separator: rgba.black10,
  positive: colors.mint,
  negative: colors.coral,
  inactive: colors.lightGray,
  disabled: rgba.black20,
});

const heroCards = Object.freeze({
  noActivity: Object.freeze({
    background: colors.yellow,
    title: colors.nearBlack,
    body: rgba.black70,
    amount: colors.nearBlack,
    statBackground: colors.butter,
    statBorder: rgba.white30,
    statLabel: rgba.black60,
    badgeBackground: colors.butter,
    badgeText: colors.amberText,
    actionBackground: colors.orange,
    actionText: colors.white,
    orbPrimary: rgba.white30,
    orbSecondary: colors.butter,
  }),
  youOwe: Object.freeze({
    background: colors.ink,
    title: colors.ember,
    body: rgba.white50,
    amount: colors.ember,
    statBackground: rgba.white10,
    statBorder: rgba.white16,
    statLabel: rgba.white30,
    badgeBackground: colors.auburn,
    badgeText: colors.ember,
    actionBackground: colors.ember,
    actionText: colors.white,
    positiveAmount: colors.acid,
    negativeAmount: colors.ember,
    orbPrimary: colors.auburn,
    orbSecondary: rgba.black40,
  }),
  owedToYou: Object.freeze({
    background: colors.forest,
    title: colors.acid,
    body: rgba.white50,
    amount: colors.acid,
    statBackground: colors.forestMuted,
    statBorder: rgba.white16,
    statLabel: rgba.white30,
    badgeBackground: colors.forestMuted,
    badgeText: colors.acid,
    actionBackground: colors.acid,
    actionText: colors.nearBlack,
    positiveAmount: colors.acid,
    negativeAmount: colors.ember,
    orbPrimary: colors.forestMuted,
    orbSecondary: rgba.black20,
  }),
  settled: Object.freeze({
    background: colors.sky,
    title: colors.skyText,
    body: colors.skyMuted,
    amount: colors.skyText,
    statBackground: rgba.white80,
    statBorder: rgba.white50,
    statLabel: colors.skyMuted,
    badgeBackground: rgba.skyStrong14,
    badgeText: colors.skyStrong,
    actionBackground: colors.skyStrong,
    actionText: colors.white,
    orbPrimary: rgba.white80,
    orbSecondary: rgba.skyStrong12,
  }),
});

const quickActions = Object.freeze({
  addExpense: Object.freeze({
    background: colors.peachSoft,
    icon: colors.orange,
    title: colors.nearBlack,
    subtitle: colors.orange,
  }),
  createGroup: Object.freeze({
    background: colors.leafSoft,
    icon: colors.leafText,
    title: colors.nearBlack,
    subtitle: colors.leafText,
  }),
  inviteMember: Object.freeze({
    background: colors.honeySoft,
    icon: colors.amberText,
    title: colors.nearBlack,
    subtitle: colors.amberText,
  }),
  settleUp: Object.freeze({
    background: colors.blueSoft,
    icon: colors.blueText,
    title: colors.nearBlack,
    subtitle: colors.blueText,
  }),
});

const semanticDark = Object.freeze({
  ...semanticLight,
  background: colors.nearBlack,
  surface: "#2A2A2A",
  surfaceStrong: colors.black,
  card: "#2A2A2A",
  text: colors.white,
  textInverse: colors.nearBlack,
  textMuted: "rgba(255,255,255,0.62)",
  border: rgba.white10,
  separator: rgba.white10,
  inactive: "#333333",
  disabled: rgba.white50,
});

export const createTheme = (mode = "light", densityScale = 1) => {
  const isDark = mode === "dark";
  const resolvedScale = Math.min(Math.max(densityScale, 0.78), 1);

  return Object.freeze({
    mode: isDark ? "dark" : "light",
    colors,
    rgba,
    semantic: isDark ? semanticDark : semanticLight,
    heroCards,
    quickActions,
    space: scaleTokenMap(space, resolvedScale),
    radii: scaleTokenMap(radii, resolvedScale),
    borderWidths,
    typography: scaleTypographyTokens(resolvedScale),
    fontFamilies,
    fontWeights,
    shadows,
    sizes: scaleTokenMap(sizes, resolvedScale),
    motion,
    zIndices,
    densityScale: resolvedScale,
  });
};

export const lightTheme = createTheme("light");
export const darkTheme = createTheme("dark");
