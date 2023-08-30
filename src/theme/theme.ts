import { createTheme } from "@shopify/restyle";
import { Size } from "./size";
import { Typography } from "./typography";

//PALETTE
const palette = {
  orangeLight: "#DA6002",
  orangePrimary: "#FF8323",
  orangeDark: "#AB4A00",

  redBordeaux: "#FB222D",

  white: "#F0F2F3",
  grey: "#939597",
  offWhite: "#DDD",
  black: "#0B0B0B",
  offBlack: "#252525",
  blue: "#2652AA",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    primary: palette.orangePrimary,
    primaryDark: palette.orangeDark,
    secondary: palette.grey, //grey
    orangeDark: palette.orangeDark,
    error: palette.redBordeaux,
    white: palette.white,
    blue: palette.blue,
    black: palette.black,
    offWhite: palette.offWhite,
    offBlack: palette.offBlack,
    text: palette.black,
    textPrimaryColor: palette.orangePrimary,
  },
  spacing: {
    none: "0%",
    xxs: "1%",
    xs: "2%",
    s: "4%",
    m: "8%",
    l: "16%",
    xl: "32%",
    xxl: "40%",
  },
  sizes: {
    ...Size.DIMENSIONS,
  },
  breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
  borderRadii: {
    none: 0,
    xxs: 4,
    xs: 8,
    sm: 16,
    md: 24,
    lg: 64,
    hg: 128,
  },
  textVariants: {
    ...Typography,
    button: {
      ...Typography.button,
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
    },
    defaults: {
      fontSize: 12,
    },
  },
  buttonVariants: {
    primary: {
      backgroundColor: "primary",
      color: "white",
    },
    secondary: {
      backgroundColor: "blue",
      color: "white",
    },
    tertiary: {
      backgroundColor: "secondary",
      color: "black",
      borderColor: "secondary",
    },
  },
});

const darkTheme = createTheme({
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,
    primary: palette.orangePrimary,
    secondary: palette.black, //grey
    error: palette.redBordeaux,
    white: palette.offWhite,
    black: palette.offBlack,
    text: palette.white,
  },
});

export type Theme = typeof theme;
export { theme, darkTheme };
