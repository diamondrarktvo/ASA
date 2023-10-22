import config from "_config";
import { BaseApi } from "_services";
import {
  CategoryResponseType,
  CategoryType,
  SubCategoryType,
  criteriaType,
} from "./types";
import { ApiInformationType } from "_utils";

const sharedApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query<CategoryType[], undefined>({
      query: () => ({
        url: config.GET_CATEGORY_URL,
        method: "GET",
      }),
      transformResponse: (response: CategoryResponseType) => {
        const categories: CategoryType[] = response.results || [];
        const apiInformation: ApiInformationType = {
          count: response.count,
          next: response.next,
          previous: response.previous,
        };
        return {
          categories,
          apiInformation,
        };
      },
    }),
    getSubCategory: build.query<SubCategoryType[], number>({
      query: (id) => ({
        url: config.GET_SUB_CATEGORY_URL + id,
        method: "GET",
      }),
    }),
    getCriteria: build.query<criteriaType[], number>({
      query: (id) => ({
        url: config.GET_CRITERIA_URL + id,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCategoryQuery,
  useGetSubCategoryQuery,
  useGetCriteriaQuery,
} = sharedApi;

export default sharedApi;
