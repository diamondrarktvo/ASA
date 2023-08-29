import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "_config";
import { getObjectDataToAsyncStorage } from "_utils";

export const BaseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Config.BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await getObjectDataToAsyncStorage("token");
      console.log("token aty amn baseapi : ", token);
      headers.set(
        "authorization",
        `token ${"662e0861270915a9469ecd2c854fe553fa909c19"}`,
      );

      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});
