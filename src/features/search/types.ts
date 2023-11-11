import { StackParamList, TabParamList } from "src/navigations/Types";
import { StackNavigationProp } from "@react-navigation/stack";
import { ApiInformationType } from "_utils";
import { ImageSourcePropType } from "react-native";

//navigation stepper stack types

export type searchItemNavigationTypes = StackNavigationProp<
  StackParamList,
  "search_item"
>;

export type imageAnnonceType = {
  id: number;
  user: string;
  image: ImageSourcePropType;
};

export type product_criteriaType = {
  id: number;
  criteria: number;
  name: string;
  value: string | number;
};

export type annonceType = {
  id: number;
  pictures: imageAnnonceType[];
  payement_method: payement_method_type[];
  product_criteria: product_criteriaType[];
  likes: [];
  is_favorite: boolean;
  views: [];
  name: string;
  publication_date: string;
  description: string | null;
  location: {
    longitude: number;
    latitude: number;
    //name?: string;
  };
  price: string | number;
  local_delivery_price: string | number | null;
  national_delivery_price: string | number | null;
  payement_integrate: boolean;
  expiration: number;
  quantity: number;
  type: string;
  state: string;
  email_contact: string | null;
  phone_number_contact: string | null;
  sub_category: number;
  seller: {
    id: number;
    nickname: string;
    is_followed: boolean;
    id_conversation: undefined | number;
  };
};

export type payement_method_type = {
  id: number;
  user: string;
  name: string;
  phone: string | number | null;
  card_number: string | number | null;
  expiration_date: string | number | null;
  cvv: string | number | null;
};

export type AnnoncesResponseType = ApiInformationType & {
  results: annonceType[];
};

export type AnnonceResponseType = {
  annonces: annonceType[];
};

export interface RouteSearchParams {
  typeOfSearch?: string;
  id_catg?: number;
}
