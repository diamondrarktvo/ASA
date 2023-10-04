import config from "_config";
import { BaseApi } from "_services";
import { notificationResponseType } from "./types";

const chatApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllConversations: build.query<notificationResponseType[], string>({
      query: (token) => ({
        url: config.GET_CONVERSATION_URL,
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }),
      providesTags: [{ type: "Message", id: "LIST" }],
    }),
  }),
});

export const { useGetAllConversationsQuery } = chatApi;

export default chatApi;
