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

const semanticLight = Object.freeze({
  background: colors.offWhite,
  surface: colors.lightGray,
  surfaceStrong: colors.nearBlack,
  card: colors.white,
  text: colors.nearBlack,
  textInverse: colors.white,
  textMuted: colors.midGray,
  accent: colors.lime,
  accentText: colors.nearBlack,
  secondaryAccent: colors.orange,
  danger: colors.red,
  border: rgba.black08,
  separator: rgba.black10,
  positive: colors.lime,
  negative: colors.red,
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

export const createTheme = (mode = "light") => {
  const isDark = mode === "dark";

  return Object.freeze({
    mode: isDark ? "dark" : "light",
    colors,
    rgba,
    semantic: isDark ? semanticDark : semanticLight,
    space,
    radii,
    borderWidths,
    typography,
    fontFamilies,
    fontWeights,
    shadows,
    sizes,
    motion,
    zIndices,
  });
};

export const lightTheme = createTheme("light");
export const darkTheme = createTheme("dark");
