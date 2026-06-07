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
