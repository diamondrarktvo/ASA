import { ThemeProvider } from "@shopify/restyle";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StackNavigation } from "_navigations";
import { theme } from "_theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StackNavigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
