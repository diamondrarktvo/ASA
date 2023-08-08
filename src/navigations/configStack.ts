import { CardStyleInterpolators } from "@react-navigation/stack";
import { Easing } from "react-native";
import { StackNavigationConfig } from "./Types";
import { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types";

//config for transitionSpec
const transitionConfig: TransitionSpec = {
  animation: "timing",
  config: {
    duration: 80,
    easing: Easing.linear,
  },
};

export const stackNavigationConfig: StackNavigationConfig = {
  /**stepper config */
  screenOptionsForDisplayedHeader: {
    headerShown: false,
    gestureEnabled: true,
    //CardStyleInterpolators est utile pour regler la transition durant le changement de screen, gestureEnabled doit être activé | gestureDirection peut aussi le faire|
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, //on utilise la transition par défaut de IOS
    transitionSpec: {
      open: transitionConfig,
      close: transitionConfig,
    },
    gestureDirection: "horizontal",
  },
  screenOptionsForHiddenHeader: {
    headerShown: false,
  },
  //screenOptionsTransparentHeader: {},
};
