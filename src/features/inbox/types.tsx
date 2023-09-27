import { StackParamList, TabParamList } from "src/navigations/Types";
import { StackNavigationProp } from "@react-navigation/stack";

export type messageTypes = {
  id: number;
  emetteur: string;
  message: string;
  read: boolean;
  date: string;
};

//navigation stack types

export type manageMessageNavigationTypes = StackNavigationProp<
  StackParamList,
  "manage_message"
>;

export type notificationResponseType = {
  id: number;
  title: string;
  content: string;
  is_read: boolean;
  timestamp: string;
  owner: number;
};
