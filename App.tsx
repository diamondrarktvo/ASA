import "react-native-gesture-handler";
navigator.__defineGetter__("userAgent", function () {
  // you have to import rect native first !!
  return "react-native";
});
import { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StackNavigation } from "_navigations";
import { theme, darkTheme } from "_theme";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Provider } from "react-redux";
import { store } from "_store";
import io from "socket.io-client";

const SOCKET_URL =
  "wss://metyamikoservice-api.onrender.com/ws/notification/joe";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [connected, setConnected] = useState(false);

  const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    rejectUnauthorized: false,
    auth: {
      access_token: "86567dd03ac2be30f1d58ebd811bcd2a4ed1d72d",
    },
  });

  useEffect(() => {
    console.log("depart e");
    console.log("socket : ", socket);
    socket.on("connected", () => {
      console.log("Connected to server e");
    });

    /*socket.on("connect_error", (err) => {
      console.log(err);
    });*/

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    console.log("fin");
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <StatusBar backgroundColor={theme.colors.primary} />
              <StackNavigation />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
