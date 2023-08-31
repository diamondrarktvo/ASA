import { ApiInformationType } from "_utils";

export type CategoryType = {
  id: number;
  name: string;
  image: string;
};

export type CategoriesType = {
  categories: CategoryType[];
};

export type CategoryResponseType = ApiInformationType & {
  results: CategoryType[];
};
