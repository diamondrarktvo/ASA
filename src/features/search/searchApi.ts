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
    getAllAnnonce: build.query<
      { annonces: annonceType[]; apiInformation: ApiInformationType },
      string | undefined
    >({
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
      providesTags: [{ type: "Announce", id: "LIST" }],
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
      providesTags: (result) =>
        result
          ? [{ type: "Announce", id: result.id }]
          : [{ type: "Announce", id: "LIST" }],
    }),
    getAnnonceByCategory: build.query<
      annonceType[],
      { id_catg: number; token: string | undefined }
    >({
      query: (arg) => ({
        url: `${config.GET_PRODUCT_URL}/category/${arg.id_catg}`,
        method: "GET",
        headers: {
          Authorization: arg.token ? `token ${arg.token}` : undefined,
        },
      }),
      providesTags: [{ type: "Announce", id: "LIST" }],
    }),
    getAllMyAnnonce: build.query<annonceType[], { token: string | undefined }>({
      query: (arg) => ({
        url: `${config.GET_PRODUCT_URL}/myproduct`,
        method: "GET",
        headers: {
          Authorization: arg.token ? `token ${arg.token}` : undefined,
        },
      }),
      providesTags: [{ type: "Announce", id: "LIST" }],
    }),
    getAnnonceBySearching: build.query<
      { annonces: annonceType[]; apiInformation: ApiInformationType },
      { token: string | undefined; textToSearch: string }
    >({
      query: (arg) => ({
        url: `${config.GET_PRODUCT_URL}?search=${arg.textToSearch}`,
        method: "GET",
        headers: {
          Authorization: arg.token ? `token ${arg.token}` : undefined,
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
      providesTags: [{ type: "Announce", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllAnnonceQuery,
  useGetOneAnnonceQuery,
  useGetAnnonceByCategoryQuery,
  useGetAllMyAnnonceQuery,
  useGetAnnonceBySearchingQuery,
} = searchApi;

export default searchApi;
