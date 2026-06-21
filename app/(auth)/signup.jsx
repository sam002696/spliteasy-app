import React from "react";
import { ThemeProvider } from "../../src/design-system";
import { SignupScreen } from "../../src/screens/signup";

export default function SignupRoute() {
  return (
    <ThemeProvider mode="light">
      <SignupScreen />
    </ThemeProvider>
  );
}
