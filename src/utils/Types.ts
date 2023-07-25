import { ImageSourcePropType } from "react-native";

export type annonceTypes = {
    id: number,
    title: string,
    image: ImageSourcePropType,
    description: string;
}

export type announcerTypes = {
    id: number,
    name: string,
    image: ImageSourcePropType,
    phoneNumber: string;
}

export type categorieTypes = {
    id: number,
    title: string;
}