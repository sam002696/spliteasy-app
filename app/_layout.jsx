import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { ThemeProvider, useTheme } from "../src/design-system";
import { ToastViewport } from "../src/components/toast";
import { AuthGate } from "../src/navigation";
import { NotificationRuntime } from "../src/services/notifications";
import { store } from "../src/store";

if (__DEV__) {
  LogBox.ignoreLogs(["Looks like you have configured linking in multiple places"]);
}

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
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="groups/[groupId]" />
        <Stack.Screen name="group-requests" />
        <Stack.Screen name="notifications" />
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
      <AuthGate />
      <NotificationRuntime />
      <ToastViewport />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "PlusJakartaSans-Regular": require("../src/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Medium": require("../src/fonts/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-SemiBold": require("../src/fonts/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-Bold": require("../src/fonts/PlusJakartaSans-Bold.ttf"),
    "PlusJakartaSans-ExtraBold": require("../src/fonts/PlusJakartaSans-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </Provider>
  );
}
