import config from "_config";
import { BaseApi } from "_services";
import { annonceType, AnnonceResponseType } from "./types";
import { ApiInformationType } from "_utils";

const searchApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAnnonce: build.query<annonceType[], undefined>({
      query: () => ({
        url: config.GET_PRODUCT_URL,
        method: "GET",
      }),
      transformResponse: (response: AnnonceResponseType) => {
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
  }),
  overrideExisting: true,
});

export const { useGetAllAnnonceQuery } = searchApi;

export default searchApi;
