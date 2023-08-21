import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "_config";

export const BaseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Config.BASE_URL,
    /*prepareHeaders: (headers) => {
      const token = null;
      headers.set("authorization", `Bearer ${token}`);

      return headers;
    },*/
  }),
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});
