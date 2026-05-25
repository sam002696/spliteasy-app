import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "./src/design-system";

export default function App() {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to SplitEasy</Text>
      </View>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFFFA",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F1F1F",
  },
});
