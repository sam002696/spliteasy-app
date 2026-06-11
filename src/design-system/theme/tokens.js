export const colors = Object.freeze({
  lime: "#DCFD52",
  yellow: "#FFD166",
  mint: "#18D9A8",
  coral: "#EF476F",
  ember: "#FF745F",
  acid: "#DDFC3F",
  forest: "#123820",
  forestMuted: "#24452F",
  ink: "#171818",
  auburn: "#512B21",
  sky: "#E5F5FF",
  skyStrong: "#3CA0CD",
  skyText: "#1B4B70",
  skyMuted: "#7CA1B9",
  butter: "#FFE4A8",
  amberText: "#7A5A11",
  nearBlack: "#1E1A14",
  offWhite: "#FFF9F3",
  cream: "#F3EEE6",
  orange: "#FF6335",
  red: "#EF476F",
  lightGray: "#F3EFE7",
  midGray: "#9B9287",
  taupe: "#6D6258",
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
  black70: "rgba(0,0,0,0.7)",
  skyStrong12: "rgba(60,160,205,0.12)",
  skyStrong14: "rgba(60,160,205,0.14)",
  white16: "rgba(255,255,255,0.16)",
  white30: "rgba(255,255,255,0.3)",
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
  hero: 30,
  xl: 30,
  full: 999,
});

export const borderWidths = Object.freeze({
  hairline: 0.5,
  thin: 1,
  medium: 2,
});

export const fontFamilies = Object.freeze({
  display: "PlusJakartaSans-ExtraBold",
  body: "PlusJakartaSans-Regular",
  bodyMedium: "PlusJakartaSans-Medium",
  bodySemiBold: "PlusJakartaSans-SemiBold",
  bodyBold: "PlusJakartaSans-Bold",
  displayFallback: "PlusJakartaSans-ExtraBold",
  bodyFallback: "PlusJakartaSans-Regular",
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
    fontSize: 44,
    lineHeight: 50,
    fontWeight: fontWeights.bold,
  },
  screenTitle: {
    fontFamily: fontFamilies.display,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: fontWeights.bold,
  },
  sectionTitle: {
    fontFamily: fontFamilies.display,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: fontWeights.semibold,
  },
  cardTitle: {
    fontFamily: fontFamilies.bodyBold,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: fontWeights.semibold,
  },
  cardAmount: {
    fontFamily: fontFamilies.display,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: fontWeights.semibold,
  },
  body: {
    fontFamily: fontFamilies.body,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: fontWeights.regular,
  },
  bodySmall: {
    fontFamily: fontFamilies.body,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: fontWeights.regular,
  },
  field: {
    fontFamily: fontFamilies.bodyBold,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeights.semibold,
  },
  label: {
    fontFamily: fontFamilies.body,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: fontWeights.regular,
  },
  micro: {
    fontFamily: fontFamilies.bodyBold,
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
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 22,
    elevation: 6,
  },
  soft: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
});

export const sizes = Object.freeze({
  minTapTarget: 44,
  iconButton: 44,
  fab: 56,
  avatarSm: 32,
  avatarMd: 48,
  avatarLg: 64,
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
