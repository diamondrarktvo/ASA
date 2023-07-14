import { StackParamList, TabParamList } from "src/navigations/Types";
import { StackNavigationProp } from "@react-navigation/stack";

export type messageTypes = {
  id: number;
  emetteur: string;
  message: string;
  read: boolean;
  date: string;
};

export type notificationTypes = {
  id: number;
  notifieur: string;
  information: string;
  read: boolean;
  date: string;
};

//navigation stack types

export type manageMessageNavigationTypes = StackNavigationProp<
  StackParamList,
  "manage_message"
>;
