import "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { ThemeProvider, useTheme } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StackNavigation } from "_navigations";
import { theme, darkTheme } from "_theme";
import { Platform, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Provider } from "react-redux";
import { store } from "_store";
import SocketNotification from "./SocketNotification";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "34686fb8-ad5d-4653-b677-ee1aebe3c7ea",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<unknown>();
  const responseListener = useRef<unknown>();

  //configure globally notification
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        if (notification) {
          setNotification(notification);
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <StatusBar backgroundColor={theme.colors.primary} />
              <SocketNotification />
              <StackNavigation />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
