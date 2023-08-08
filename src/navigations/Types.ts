import { StackNavigationOptions } from "@react-navigation/stack";

export interface StackNavigationConfig {
  screenOptionsForDisplayedHeader: StackNavigationOptions;
  screenOptionsForHiddenHeader: StackNavigationOptions;
}

export type StackParamList = {
  main_tabs: undefined;
  manage_profil: undefined;
  personnal_information: undefined;
  create_account_screen: undefined;
  manage_message: { emetteur: string };
  //stepper screens
  stepper_screen_1: undefined;
  stepper_screen_2: undefined;
  stepper_screen_3: undefined;
  stepper_screen_4: undefined;
  stepper_screen_5: undefined;
  stepper_screen_6: undefined;
  stepper_screen_7: undefined;
  //end of stepper screens
};

export type TabParamList = {
  search_screen: undefined;
  favorite_screen: undefined;
  publish_screen: undefined;
  inbox_screen: undefined;
  account_screen: undefined;
};

export type TopParamListInbox = {
  message_screen: undefined;
  notification_screen: undefined;
};

export type TopParamListFavourite = {
  announcement_screen: undefined;
  announcer_screen: undefined;
  search_favourite_screen: undefined;
};
