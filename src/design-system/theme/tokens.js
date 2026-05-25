export const colors = Object.freeze({
  lime: "#DCFD52",
  nearBlack: "#1F1F1F",
  offWhite: "#FEFFFA",
  orange: "#FCAD52",
  red: "#FF6B6B",
  lightGray: "#F5F5F0",
  midGray: "#888888",
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
});

export const rgba = Object.freeze({
  black06: "rgba(0,0,0,0.06)",
  black08: "rgba(0,0,0,0.08)",
  black10: "rgba(0,0,0,0.1)",
  black20: "rgba(0,0,0,0.2)",
  black40: "rgba(0,0,0,0.4)",
  black60: "rgba(0,0,0,0.6)",
  white10: "rgba(255,255,255,0.1)",
  white50: "rgba(255,255,255,0.5)",
  white60: "rgba(255,255,255,0.6)",
  white80: "rgba(255,255,255,0.8)",
});

export const space = Object.freeze({
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
});

export const radii = Object.freeze({
  none: 0,
  sm: 10,
  md: 14,
  lg: 18,
  hero: 20,
  xl: 24,
  full: 999,
});

export const borderWidths = Object.freeze({
  hairline: 0.5,
  thin: 1,
  medium: 2,
});

export const fontFamilies = Object.freeze({
  display: "Clash Display",
  body: "Lota Grotesque",
  displayFallback: "DM Sans",
  bodyFallback: "Inter",
  system: undefined,
});

export const fontWeights = Object.freeze({
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
});

export const typography = Object.freeze({
  heroAmount: {
    fontFamily: fontFamilies.display,
    fontSize: 46,
    lineHeight: 52,
    fontWeight: fontWeights.bold,
  },
  screenTitle: {
    fontFamily: fontFamilies.display,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: fontWeights.bold,
  },
  sectionTitle: {
    fontFamily: fontFamilies.display,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: fontWeights.semibold,
  },
  cardTitle: {
    fontFamily: fontFamilies.body,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: fontWeights.semibold,
  },
  cardAmount: {
    fontFamily: fontFamilies.body,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: fontWeights.semibold,
  },
  body: {
    fontFamily: fontFamilies.body,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeights.regular,
  },
  bodySmall: {
    fontFamily: fontFamilies.body,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: fontWeights.regular,
  },
  field: {
    fontFamily: fontFamilies.body,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeights.semibold,
  },
  label: {
    fontFamily: fontFamilies.body,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeights.regular,
  },
  micro: {
    fontFamily: fontFamilies.body,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: fontWeights.semibold,
  },
  scannerTip: {
    fontFamily: fontFamilies.body,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: fontWeights.regular,
  },
});

export const shadows = Object.freeze({
  none: {
    shadowOpacity: 0,
    elevation: 0,
  },
  raised: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
});

export const sizes = Object.freeze({
  minTapTarget: 44,
  iconButton: 44,
  fab: 56,
  avatarSm: 32,
  avatarMd: 40,
  avatarLg: 56,
  scannerHeight: 420,
  scannerGuideWidth: 280,
  scannerGuideHeight: 380,
  shutter: 72,
});

export const motion = Object.freeze({
  fast: 120,
  normal: 150,
  spring: 180,
  screen: 250,
  save: 280,
});

export const zIndices = Object.freeze({
  base: 0,
  raised: 10,
  overlay: 100,
  modal: 1000,
});
