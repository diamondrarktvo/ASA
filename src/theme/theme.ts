import { createTheme } from "@shopify/restyle";

//PALETTE
const palette = {
  orangeLight: "#F8AC71",
  orangePrimary: "#FF8323",
  orangeDark: "#C66316",

  redBordeaux: "#9B0409",

  white: "#F0F2F3",
  offWhite: "#DDD",
  black: "#0B0B0B",
  offBlack: "#252525",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    primary: palette.orangePrimary,
    white: palette.white,
    black: palette.black,
    error: palette.redBordeaux,
    offWhite: palette.offWhite,
    offBlack: palette.offBlack,
    buttonPrimaryBackground: palette.orangePrimary,
    cardPrimaryBackground: palette.orangePrimary,
    cardLightBackground: palette.orangeLight,
    textPrimaryColor: palette.orangePrimary,
    textBlackColor: palette.offBlack,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
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
  textVariants: {
    bigTitle: {
      fontWeight: "bold",
      fontiSize: 34,
    },
    title: {
      fontWeight: "bold",
      fontiSize: 24,
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 24,
    },
    text: {
      fontSize: 12,
      lineHeight: 16,
    },
    smallText: {
      fontSize: 8,
      lineHeight: 12,
    },
  },
  cardVariants: {
    primary: {
      backgroundColor: "cardPrimaryBackground",
      borderRadius: 16,
      padding: "s",
    },
    light: {
      backgroundColor: "cardLightBackground",
      borderRadius: 16,
      padding: "s",
    },
  },
});

export type Theme = typeof theme;
export default theme;
