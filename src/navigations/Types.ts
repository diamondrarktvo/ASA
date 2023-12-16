import { NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";

export interface StackNavigationConfig {
  screenOptionsForCustomHiddenHeader: StackNavigationOptions;
  screenOptionsForHiddenHeader: StackNavigationOptions;
  screenOptionsForDisplayedHeader: StackNavigationOptions;
}

export type StackParamList = {
  main_tab: NavigatorScreenParams<TabParamList>;
  manage_profil: undefined;
  personnal_information: undefined;
  manage_payment: undefined;
  my_annouce_screen: undefined;
  create_account_screen: undefined;
  manage_message: {
    emetteur: {
      nickName: string;
      id_seller: number;
      id_conversation: number | null;
    };
  };
  //checkout_screen
  checkout_screen_1: undefined;
  checkout_screen_2: undefined;
  //stepper screens
  stepper_screen_1: undefined;
  stepper_screen_2: undefined;
  stepper_screen_3: undefined;
  stepper_screen_4: undefined;
  stepper_screen_5: undefined;
  stepper_screen_6: undefined;
  stepper_screen_7: undefined;
  //end of stepper screens
  search_item: {
    id_catg?: number;
    name_catg?: string;
    typeOfSearch?: string;
  };
  product_detail_screen: { idOfProduct: number };
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

// To type the navigation object obtained from useNavigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
