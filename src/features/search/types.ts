import { StackParamList, TabParamList } from "src/navigations/Types";
import { StackNavigationProp } from "@react-navigation/stack";
import { ApiInformationType } from "_utils";
import { ImageSourcePropType } from "react-native";

//navigation stepper stack types

export type searchItemNavigationTypes = StackNavigationProp<
  StackParamList,
  "search_item"
>;

export type annonceType = {
  id: number;
  pictures: ImageSourcePropType[];
  payement_method: payement_method_type[];
  product_criteria: [];
  likes: [];
  views: [];
  name: string;
  publication_date: string;
  description: string | null;
  location: string | null;
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
  seller: string;
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
