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
    getAllAnnonce: build.query<annonceType[], undefined>({
      query: () => ({
        url: config.GET_PRODUCT_URL,
        method: "GET",
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
    getOnAnnonce: build.query<annonceType, number>({
      query: (id) => ({
        url: `${config.GET_PRODUCT_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllAnnonceQuery, useGetOnAnnonceQuery } = searchApi;

export default searchApi;
