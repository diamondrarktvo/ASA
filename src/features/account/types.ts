import { StackParamList, TabParamList } from "src/navigations/Types";
import { StackNavigationProp } from "@react-navigation/stack";

//navigation stack types
export type manageProfilNavigationTypes = StackNavigationProp<
  StackParamList,
  "manage_profil"
>;

export type favoriteNavigationTypes = StackNavigationProp<
  TabParamList,
  "favorite_screen"
>;

export type accountNavigationTypes = StackNavigationProp<
  TabParamList,
  "account_screen"
>;

export type PersonnalInformationNavigationTypes = StackNavigationProp<
  StackParamList,
  "personnal_information"
>;

export type createAccountNavigationTypes = StackNavigationProp<
  StackParamList,
  "create_account_screen"
>;

export type loginValuesTypes = {
  phone_number: string;
  password: string;
};
