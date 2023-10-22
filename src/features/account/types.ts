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

export type registerResponseTypes = {
  user: {
    nickname: null;
    email: null;
    phone_number: null;
    first_name: null;
    last_name: null;
    age: null;
    image: null;
    is_professional: false;
    company_name: null;
    unique_company_number: null;
    password: null;
  };
  token: string;
};

export type errorResponseTypes = {
  data: {
    detail: string;
  };
  status: number;
};
