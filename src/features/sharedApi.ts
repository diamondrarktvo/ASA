import config from "_config";
import { BaseApi } from "_services";
import { CategoryType } from "./types";

const sharedApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query<CategoryType[], undefined>({
      query: () => ({
        url: config.GET_CATEGORY_URL,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {} = sharedApi;

export default sharedApi;
