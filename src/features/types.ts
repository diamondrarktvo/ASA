import { ApiInformationType } from "_utils";

export type CategoryType = {
  id: number;
  name: string;
  image: string;
};

export type criteriaType = {
  id: number;
  response: [
    {
      value: string;
    },
  ];
  name: string;
  type: string;
};

export type SubCategoryType = {
  id: number | undefined;
  nom: string | undefined;
};

export type CategoriesType = {
  categories: CategoryType[];
};

export type CategoryResponseType = ApiInformationType & {
  results: CategoryType[];
};
