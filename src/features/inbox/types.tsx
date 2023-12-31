import { StackParamList, TabParamList } from "src/navigations/Types";
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageSourcePropType } from "react-native";

export type messageTypes = {
  id: number;
  emetteur: string;
  message: string;
  read: boolean;
  date: string;
};

export type participantTypes = {
  id: number;
  nickname: string;
  image: ImageSourcePropType;
  is_me: false;
};

export type conversationTypes = {
  id: number;
  participants: participantTypes[];
  latest_message: null | {
    text: string;
    createAt: string;
  };
};

export type newConversationTypesAfterTransform = {
  id: number;
  participants: participantTypes;
};

export type messageType = {
  _id: number;
  text: string;
  createAt: string;
  user: {
    _id: number;
    name: string;
    avatar: ImageSourcePropType | null;
  };
};

export type messageGiftedProps = {
  _id: string;
  createdAt: string;
  text: string;
  user: {
    _id: number;
  };
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
  user_action: {
    id: number;
    nickname: string;
    image: ImageSourcePropType;
  };
  owner: number;
};
