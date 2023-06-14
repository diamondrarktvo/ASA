import { DefaultTheme } from "@react-navigation/native";
import { theme } from "./Types";

//PALETTE
const paletteLight = {
  primaryOrange: "#FF8323",
  whiteGrey: "#7E7E7E",
  white: "#FFF",
  black: "#37463D",
  background: "#FFF",
  navigation: "#F0F0F0",
  text: "#333533",
};

const paletteDark = {
  primaryOrange: "#FF8323",
  whiteGrey: "#7E7E7E",
  white: "#FFF",
  black: "#37463D",
  background: "#37463D",
  navigation: "#37463D",
  text: "#FFF",
};

//NAVIGATION THEME
export const lightTheme: theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: paletteLight.primaryOrange,
    background: paletteLight.background,
    text: paletteLight.text,
    black: paletteLight.black,
    navigation: paletteLight.navigation,
    white: paletteLight.white,
    whiteGrey: paletteLight.whiteGrey,
  },
};
export const darkTheme: theme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: paletteDark.primaryOrange,
    background: paletteDark.background,
    text: paletteDark.text,
    navigation: paletteDark.navigation,
    black: paletteDark.black,
    white: paletteDark.white,
    whiteGrey: paletteDark.whiteGrey,
  },
};
