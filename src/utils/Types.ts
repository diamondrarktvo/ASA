import { ImageSourcePropType } from "react-native";

export type annonceTypes = {
  id: number;
  title: string;
  image: ImageSourcePropType;
  description: string;
};

export type announcerTypes = {
  id: number;
  name: string;
  image: ImageSourcePropType;
  phoneNumber: string;
};

export type categorieTypes = {
  id: number;
  title: string;
};

export type searchTypes = {
  id: number;
  searchValue: string;
};

export type errorConstants = {
  SUCCESS: number;
  CREATED: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  FORBIDDEN: number;
  NOT_FOUND: {
    status: number;
    message: string;
  };
  INTERNAL_SERVER_ERROR: number;
};
