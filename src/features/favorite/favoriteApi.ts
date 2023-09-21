import config from "_config";
import { BaseApi } from "_services";
import { favoriteType } from "./types";
import { ApiInformationType } from "_utils";

type deleteProps = { id: number; token: string };

const favoriteApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllFavoriteByUser: build.query<favoriteType[], string>({
      query: (token) => ({
        url: config.GET_FAVORITE_URL,
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }),
    }),
    deleteFavorite: build.mutation<undefined | null, deleteProps>({
      query: (arg) => ({
        url: `${config.DELETE_FAVORITE_URL}/${arg.id}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllFavoriteByUserQuery, useDeleteFavoriteMutation } =
  favoriteApi;

export default favoriteApi;
