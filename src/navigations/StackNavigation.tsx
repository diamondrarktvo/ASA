//IMPORT FROM NODE_MODULES
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//LOCAL IMPORT
import { stackNavigationConfig } from "./configStack";
import { StackParamList } from "./Types";

//IMPORT NAVIGATION TAB
import TabNavigation from "./TabNavigation";

import io from "socket.io-client";

//IMPORT SCREEN
import {
  ManageProfil,
  ManageMessageScreen,
  CreateAccountScreen,
  PersonnalInformation,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
  StepSeven,
  SearchItem,
  ManagePayment,
  ProductDetailScreen,
} from "_features";
import { useAppSelector } from "_store";
import { useEffect, useState } from "react";

const Stack = createStackNavigator<StackParamList>();

const SOCKET_URL = process.env.EXPO_PUBLIC_API_HOST || "";

const StackNavigation = () => {
  const accountUser = useAppSelector((state) => state.account);

  console.log("accountUser : ", accountUser);
  console.log("SOCKET_URL : ", SOCKET_URL);

  const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    path: "/ws/notification/Vetsokeli",
    query: {
      access_token: "86567dd03ac2be30f1d58ebd811bcd2a4ed1d72d",
    },
    auth: {
      access_token: "86567dd03ac2be30f1d58ebd811bcd2a4ed1d72d",
    },
    extraHeaders: {
      access_token: "86567dd03ac2be30f1d58ebd811bcd2a4ed1d72d",
    },
  });

  /*const socket = new WebSocket(
    "https://metyamikoservice-api.onrender.com/ws/notification/Vetsokeli",
    ["access_token", "86567dd03ac2be30f1d58ebd811bcd2a4ed1d72d"],
  );*/

  useEffect(() => {
    console.log("depart e");
    console.log("chatSocket : ", socket);
    socket.on("connect", () => {
      console.log("Connected to server e");
    });

    socket.on("open", () => {
      console.log("Connected to server e");
    });

    // verify connection
    /*socket.onopen = function (e) {
      console.log("The connection was setup successfully !");
    };*/
    // verify error
    /*socket.onclose = function (e) {
      console.log("Something unexpected happened !");
    };*/

    /*socket.on("connect_error", (err) => {
      console.log(err);
    });*/

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    console.log("fin");
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"main_tab"}>
        <Stack.Group
          screenOptions={stackNavigationConfig.screenOptionsForHiddenHeader}
        >
          <Stack.Screen name={"main_tab"} component={TabNavigation} />
          {/**Account screen */}
          <Stack.Screen name={"manage_profil"} component={ManageProfil} />
          <Stack.Screen
            name={"personnal_information"}
            component={PersonnalInformation}
          />
          <Stack.Screen
            name={"create_account_screen"}
            component={CreateAccountScreen}
          />
          <Stack.Screen name={"manage_payment"} component={ManagePayment} />
          {/**Inbox screen */}
          <Stack.Screen
            name={"manage_message"}
            component={ManageMessageScreen}
          />

          {/**Search item */}
          <Stack.Screen name={"search_item"} component={SearchItem} />
          <Stack.Screen
            name={"product_detail_screen"}
            component={ProductDetailScreen}
          />
        </Stack.Group>

        {/**Stepper screens */}
        <Stack.Group
          screenOptions={stackNavigationConfig.screenOptionsForDisplayedHeader}
        >
          <Stack.Screen name={"stepper_screen_2"} component={StepTwo} />
          <Stack.Screen name={"stepper_screen_3"} component={StepThree} />
          <Stack.Screen name={"stepper_screen_4"} component={StepFour} />
          <Stack.Screen name={"stepper_screen_5"} component={StepFive} />
          <Stack.Screen name={"stepper_screen_6"} component={StepSix} />
          <Stack.Screen name={"stepper_screen_7"} component={StepSeven} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
