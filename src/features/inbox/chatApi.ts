import config from "_config";
import { BaseApi } from "_services";
import { notificationResponseType } from "./types";

const chatApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllConversations: build.query<unknown[], string>({
      query: (token) => ({
        url: config.GET_CONVERSATION_URL,
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }),
      providesTags: [{ type: "Conversation", id: "LIST" }],
    }),
    getMessageInConversation: build.query<
      unknown[],
      { token: string | undefined; id_conversation: number }
    >({
      query: (arg) => ({
        url: `${config.GET_CONVERSATION_URL}/${arg.id_conversation}`,
        method: "GET",
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [{ type: "Conversation", id: result.id }]
          : [{ type: "Conversation", id: "LIST" }],
    }),
    postConversation: build.mutation<
      unknown[],
      { token: string; seller_id: number }
    >({
      query: (arg) => ({
        url: config.GET_CONVERSATION_URL,
        method: "POST",
        body: { seller_id: arg.seller_id },
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
      invalidatesTags: ["Conversation"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllConversationsQuery,
  useGetMessageInConversationQuery,
  usePostConversationMutation,
} = chatApi;

export default chatApi;
