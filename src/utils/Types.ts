import { ImageSourcePropType } from "react-native";

export type annonceTypes = {
    id: number,
    title: string,
    image: ImageSourcePropType,
    description: string;
}

export type categorieTypes = {
    id: number,
    title: string;
}