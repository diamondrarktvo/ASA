import { StackParamList, TabParamList } from "src/navigations/Types";
import { StackNavigationProp } from "@react-navigation/stack";

//navigation stepper stack types

export type stepper2NavigationTypes = StackNavigationProp<
  StackParamList,
  "stepper_screen_2"
>;

export type stepper3NavigationTypes = StackNavigationProp<
  StackParamList,
  "stepper_screen_3"
>;

export type stepper4NavigationTypes = StackNavigationProp<
  StackParamList,
  "stepper_screen_4"
>;

export type stepper5NavigationTypes = StackNavigationProp<
  StackParamList,
  "stepper_screen_5"
>;

export type stepper6NavigationTypes = StackNavigationProp<
  StackParamList,
  "stepper_screen_6"
>;

export type stepper7NavigationTypes = StackNavigationProp<
  StackParamList,
  "stepper_screen_7"
>;

export type criteriaSelected = {
  name: string;
  value: string | number;
};
