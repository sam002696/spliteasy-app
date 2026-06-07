import React, { createContext, useContext, useMemo } from "react";
import { Platform, useColorScheme, useWindowDimensions } from "react-native";
import { createTheme, lightTheme } from "./theme";

const ThemeContext = createContext(lightTheme);

function getDensityScale(width) {
  const platformScale = Platform.OS === "android" ? 0.84 : 1;
  const compactWidthScale = width < 390 ? width / 390 : 1;

  return platformScale * compactWidthScale;
}

export function ThemeProvider({ children, mode = "light", followSystem = false }) {
  const systemMode = useColorScheme();
  const { width } = useWindowDimensions();
  const resolvedMode = followSystem ? systemMode || "light" : mode;
  const densityScale = getDensityScale(width);
  const theme = useMemo(
    () => createTheme(resolvedMode, densityScale),
    [densityScale, resolvedMode],
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
