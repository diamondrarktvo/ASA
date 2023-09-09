import config from "_config";
import { BaseApi } from "_services";
import { CategoryResponseType, CategoryType, SubCategoryType } from "./types";
import { ApiInformationType } from "_utils";

const sharedApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query<CategoryType[], undefined>({
      query: () => ({
        url: config.GET_CATEGORY_URL,
        method: "GET",
      }),
      providesTags: ["Category"],
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
      providesTags: ["SubCategory"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetCategoryQuery, useGetSubCategoryQuery } = sharedApi;

export default sharedApi;
