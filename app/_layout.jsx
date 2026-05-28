import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { ThemeProvider, useTheme } from "../src/design-system";
import { ToastViewport } from "../src/components/toast";
import { store } from "../src/store";

function RootNavigator() {
  const theme = useTheme();

  return (
    <>
      <StatusBar style="dark" backgroundColor={theme.semantic.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.semantic.background,
          },
        }}
      >
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="groups/[groupId]" />
        <Stack.Screen
          name="(modals)/create-group"
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="(modals)/add-expense"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
      <ToastViewport />
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </Provider>
  );
}
