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
