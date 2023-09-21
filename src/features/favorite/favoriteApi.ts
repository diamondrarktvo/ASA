import config from "_config";
import { BaseApi } from "_services";
import { favoriteType } from "./types";
import { ApiInformationType } from "_utils";

const favoriteApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllFavoriteByUser: build.query<favoriteType[], undefined>({
      query: (token) => ({
        url: config.GET_FAVORITE_URL,
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllFavoriteByUserQuery } = favoriteApi;

export default favoriteApi;
