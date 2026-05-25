import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme } from "react-native";
import { createTheme, lightTheme } from "./theme";

const ThemeContext = createContext(lightTheme);

export function ThemeProvider({ children, mode = "light", followSystem = false }) {
  const systemMode = useColorScheme();
  const resolvedMode = followSystem ? systemMode || "light" : mode;
  const theme = useMemo(() => createTheme(resolvedMode), [resolvedMode]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
