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
    background: colors.oxblood,
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

const homeActivity = Object.freeze({
  cardBackground: colors.white,
  amountBackground: colors.lightGray,
});

const groupsScreen = Object.freeze({
  tabsBackground: colors.white,
  tabActiveBackground: colors.orange,
  tabActiveText: colors.white,
  tabInactiveText: colors.taupe,
  cardBackground: colors.white,
  cardDivider: rgba.black08,
  metaText: colors.midGray,
  iconTileDangerBackground: colors.redSoft,
  chevronBackground: colors.white,
  chevronBorder: rgba.black08,
  memberColors: Object.freeze([
    Object.freeze({
      background: colors.yellow,
      text: colors.nearBlack,
    }),
    Object.freeze({
      background: colors.lavenderSoft,
      text: colors.nearBlack,
    }),
    Object.freeze({
      background: colors.blueSoft,
      text: colors.nearBlack,
    }),
  ]),
});

const balancesScreen = Object.freeze({
  cardBackground: colors.white,
  cardDivider: rgba.black08,
  metaText: colors.midGray,
  debtBadgeBackground: colors.redSoft,
  debtBadgeText: colors.red,
  creditBadgeBackground: colors.greenSoft,
  creditBadgeText: colors.greenText,
  expenseIconBackground: colors.peachSoft,
  expenseIcon: colors.orange,
  actionBackground: colors.orange,
  actionText: colors.white,
});

const createGroupScreen = Object.freeze({
  cardBackground: colors.white,
  closeBackground: colors.white,
  closeIcon: colors.nearBlack,
  fieldBackground: colors.white,
  fieldBorder: rgba.black10,
  dashedBorder: rgba.black20,
  selectedChipBackground: colors.orange,
  selectedChipText: colors.white,
  chipBackground: colors.white,
  chipText: colors.nearBlack,
  currencyIconBackground: colors.leafSoft,
  currencyBadgeBackground: colors.leafSoft,
  currencyBadgeBorder: colors.leafText,
  currencyBadgeText: colors.leafText,
  inviteAvatarBackground: colors.yellow,
  inviteAvatarText: colors.nearBlack,
  removeBackground: colors.redSoft,
  removeIcon: colors.red,
  pendingDot: colors.yellow,
  footerButtonBackground: colors.orange,
  footerButtonText: colors.white,
});

const groupDetailScreen = Object.freeze({
  cardBackground: colors.white,
  cardDivider: rgba.black08,
  headerButtonBackground: colors.white,
  headerButtonIcon: colors.nearBlack,
  metaText: colors.midGray,
  categoryBackground: colors.peachSoft,
  categoryText: colors.orange,
  avatarBackground: colors.orange,
  avatarText: colors.white,
  iconTileBackground: colors.peachSoft,
  iconTileText: colors.orange,
  actionBackground: colors.orange,
  actionText: colors.white,
  statusBackground: colors.peachSoft,
  statusText: colors.orange,
  settledBackground: colors.greenSoft,
  settledText: colors.greenText,
});

const bottomNav = Object.freeze({
  background: colors.oxblood,
  border: rgba.white10,
  activeBackground: rgba.white10,
  activeIconBackground: rgba.white16,
  activeText: colors.white,
  inactiveIcon: colors.cream,
});

const profile = Object.freeze({
  identityBackground: colors.cream,
  avatarBackground: colors.ink,
  avatarText: colors.orange,
  actionBackground: colors.orange,
  actionText: colors.white,
  orbPrimary: colors.peachSoft,
  orbSecondary: colors.leafSoft,
  rowBackground: colors.white,
  rowSeparator: rgba.black06,
  chevron: rgba.black20,
  iconTiles: Object.freeze({
    notifications: Object.freeze({
      background: colors.peachSoft,
      icon: colors.orange,
    }),
    "default-currency": Object.freeze({
      background: colors.leafSoft,
      icon: colors.leafText,
    }),
    privacy: Object.freeze({
      background: colors.blueSoft,
      icon: colors.blueText,
    }),
    "settlement-history": Object.freeze({
      background: colors.lavenderSoft,
      icon: colors.purpleText,
    }),
    "manual-settlements": Object.freeze({
      background: colors.honeySoft,
      icon: colors.amberText,
    }),
    support: Object.freeze({
      background: colors.greenSoft,
      icon: colors.greenText,
    }),
    "sign-out": Object.freeze({
      background: colors.redSoft,
      icon: colors.red,
    }),
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
    bottomNav,
    homeActivity,
    groupsScreen,
    balancesScreen,
    createGroupScreen,
    groupDetailScreen,
    profile,
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
