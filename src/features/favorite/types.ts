import { StackParamList } from "src/navigations/Types";
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
};
