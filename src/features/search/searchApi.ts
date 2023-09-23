import config from "_config";
import { BaseApi } from "_services";
import {
  annonceType,
  AnnoncesResponseType,
  AnnonceResponseType,
} from "./types";
import { ApiInformationType } from "_utils";

const searchApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAnnonce: build.query<annonceType[], string | undefined>({
      query: (token) => ({
        url: config.GET_PRODUCT_URL,
        method: "GET",
        headers: {
          Authorization: token ? `token ${token}` : undefined,
        },
      }),
      transformResponse: (response: AnnoncesResponseType) => {
        const annonces: annonceType[] = response.results || [];
        const apiInformation: ApiInformationType = {
          count: response.count,
          next: response.next,
          previous: response.previous,
        };
        return {
          annonces,
          apiInformation,
        };
      },
    }),
    getOneAnnonce: build.query<
      annonceType,
      { id: number; token: string | undefined }
    >({
      query: (arg) => ({
        url: `${config.GET_PRODUCT_URL}/${arg.id}`,
        method: "GET",
        headers: {
          Authorization: arg.token ? `token ${arg.token}` : undefined,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllAnnonceQuery, useGetOneAnnonceQuery } = searchApi;

export default searchApi;
