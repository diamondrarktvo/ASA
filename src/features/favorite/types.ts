import { StackParamList } from "src/navigations/Types";
import { ImageSourcePropType } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

//export type detailScreenNavigationType = StackNavigationProp<StackParamList, "">;

export type favoriteType = {
  id: number;
  seller: sellerType;
  timestamp: string;
};

export type sellerType = {
  id: number;
  nickname: string;
  image: null | string;
  id_conversation: undefined | number;
};

export type favoriteAnnonceType = {
  id: number;
  user: string;
  product: {
    id: number;
    name: string;
    pictures: ImageSourcePropType[];
  };
  timestamp: string;
};
