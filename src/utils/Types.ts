import { ImageSourcePropType } from "react-native";
import { Image } from "_shared";

export type announcerTypes = {
  id: number;
  name: string;
  image: ImageSourcePropType;
  phoneNumber: string;
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

export interface HttpResponse {
  message: string;
  code: number;
}

export interface SuccessHttpResponse<T> {
  status: boolean;
  count: number;
  next: string | null;
  previous: string | null;
  data: T[];
  http_response: HttpResponse;
}

export type ApiInformationType = {
  count: number;
  next: string | null;
  previous: string | null;
};
