import { DefaultTheme } from '@react-navigation/native';
import {theme} from './Types';


//PALETTE
const paletteLight = {
    primaryOrange: '#FF8323',
    whiteGrey: '#E5E7E6',
    white: "#FFF",
    black: "#0C0F0A",
    background: '#FFF',
    text: '#333533'
}

const paletteDark = {
    primaryOrange: '#FF8323',
    whiteGrey: '#E5E7E6',
    white: "#FFF",
    black: "#0C0F0A",
    background: '#0C0F0A',
    text: '#FFF'
}

//NAVIGATION THEME
export const lightTheme: theme = {
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: paletteLight.primaryOrange,
        background: paletteLight.background,
        text: paletteLight.text,
        black: paletteLight.black,
        white: paletteLight.white,
        whiteGrey: paletteLight.whiteGrey
    }
}
export const darkTheme: theme = {
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        primary: paletteDark.primaryOrange,
        background: paletteDark.background,
        text: paletteDark.text,
        black: paletteDark.black,
        white: paletteDark.white,
        whiteGrey: paletteDark.whiteGrey
    }
}