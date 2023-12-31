import config from "_config";
import { BaseApi } from "_services";
import { favoriteAnnonceType, favoriteType } from "./types";
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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "FavoriteSeller" as const,
                id,
              })),
              { type: "FavoriteSeller", id: "LIST" },
            ]
          : [{ type: "FavoriteSeller", id: "LIST" }],
    }),
    deleteFavoriteSeller: build.mutation<undefined | null, deleteProps>({
      query: (arg) => ({
        url: `${config.FAVORITE_SELLER_URL}/${arg.id}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
      invalidatesTags: ["FavoriteSeller", "Announce"],
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
      invalidatesTags: ["FavoriteSeller", "Announce"],
    }),
    getAllFavoriteAnnonceByUser: build.query<favoriteAnnonceType[], string>({
      query: (token) => ({
        url: config.FAVORITE_PRODUCT_URL,
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "FavoriteAnnounce" as const,
                id,
              })),
              { type: "FavoriteAnnounce", id: "LIST" },
            ]
          : [{ type: "FavoriteAnnounce", id: "LIST" }],
    }),
    deleteFavoriteAnnonce: build.mutation<undefined | null, deleteProps>({
      query: (arg) => ({
        url: `${config.FAVORITE_PRODUCT_URL}/${arg.id}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
      invalidatesTags: ["FavoriteAnnounce", "Announce"],
    }),
    addFavoriteAnnonce: build.mutation<undefined | null, addProps>({
      query: (arg) => ({
        url: config.FAVORITE_PRODUCT_URL,
        method: "POST",
        body: {
          id_product: arg.id,
        },
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
      invalidatesTags: ["FavoriteAnnounce", "Announce"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllFavoriteSellerByUserQuery,
  useDeleteFavoriteSellerMutation,
  useAddFavoriteSellerMutation,
  useAddFavoriteAnnonceMutation,
  useDeleteFavoriteAnnonceMutation,
  useGetAllFavoriteAnnonceByUserQuery,
} = favoriteApi;

export default favoriteApi;
