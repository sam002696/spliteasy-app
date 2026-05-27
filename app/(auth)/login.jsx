import React from "react";
import { ThemeProvider } from "../../src/design-system";
import { LoginScreen } from "../../src/screens/login";

export default function LoginRoute() {
  return (
    <ThemeProvider mode="dark">
      <LoginScreen />
    </ThemeProvider>
  );
}
