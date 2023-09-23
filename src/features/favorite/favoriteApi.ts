import config from "_config";
import { BaseApi } from "_services";
import { favoriteType } from "./types";
import { ApiInformationType } from "_utils";

type deleteProps = { id: number; token: string };
type addProps = deleteProps;

const favoriteApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllFavoriteSellerByUser: build.query<favoriteType[], string>({
      query: (token) => ({
        url: config.FAVORITE_SELLER_URL,
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }),
    }),
    deleteFavoriteSeller: build.mutation<undefined | null, deleteProps>({
      query: (arg) => ({
        url: `${config.FAVORITE_SELLER_URL}/${arg.id}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
    }),
    addFavoriteSeller: build.mutation<undefined | null, addProps>({
      query: (arg) => ({
        url: config.FAVORITE_SELLER_URL,
        method: "POST",
        body: {
          seller_id: arg.id,
        },
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllFavoriteSellerByUserQuery,
  useDeleteFavoriteSellerMutation,
  useAddFavoriteSellerMutation,
} = favoriteApi;

export default favoriteApi;
