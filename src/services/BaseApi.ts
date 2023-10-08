import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "_config";

export const BaseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Config.BASE_URL,
  }),
  tagTypes: [
    "Auth",
    "FavoriteSeller",
    "FavoriteAnnounce",
    "Notification",
    "Announce",
    "Conversation",
    "Message",
  ],
  endpoints: () => ({}),
});
