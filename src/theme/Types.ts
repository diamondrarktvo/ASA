import { Theme } from "@react-navigation/native";

export type theme = Theme & {
  colors: {
    white: string;
    black: string;
    whiteGrey: string;
    navigation: string;
  };
};
