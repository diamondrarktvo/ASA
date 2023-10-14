import config from "_config";
import { BaseApi } from "_services";
import {
  conversationTypes,
  newConversationTypesAfterTransform,
  participantTypes,
} from "./types";

const chatApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllConversations: build.query<conversationTypes[], string | undefined>({
      query: (token) => ({
        url: config.GET_CONVERSATION_URL,
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }),
      transformResponse: (resp: conversationTypes[]) => {
        const allConversations: conversationTypes[] | [] = resp
          ? resp.map((conversation) => ({
              id: conversation.id,
              participants: conversation.participants.filter(
                (participant) => !participant.is_me,
              ),
            }))
          : [];
        return allConversations;
      },
      providesTags: [{ type: "Conversation", id: "LIST" }],
    }),
    getIfConversationStarted: build.query<
      { is_started: boolean },
      { token: string | undefined; id_seller: number }
    >({
      query: (arg) => ({
        url: `${config.GET_CONVERSATION_URL}/status/${arg.id_seller}`,
        method: "GET",
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
      transformResponse: (resp: { is_started: boolean }) => {
        return resp.is_started;
      },
    }),
    getMessageInConversation: build.query<
      conversationTypes[],
      { token: string | undefined; id_conversation: number | null }
    >({
      query: (arg) => ({
        url: `${config.GET_CONVERSATION_URL}/${arg.id_conversation}`,
        method: "GET",
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
      providesTags: (result, _, arg) => [
        { type: "Conversation", id: arg.id_conversation },
      ],
    }),
    startConversation: build.mutation<
      conversationTypes,
      { token: string | undefined; seller_id: number }
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
    deleteConversation: build.mutation<
      undefined,
      { token: string | undefined; id_conversation: number | null }
    >({
      query: (arg) => ({
        url: `${config.GET_CONVERSATION_URL}/${arg.id_conversation}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
      invalidatesTags: ["Conversation"],
    }),
    sendMessage: build.mutation<
      undefined,
      {
        token: string | undefined;
        message: string;
        id_conversation: number | null;
      }
    >({
      query: (arg) => ({
        url: config.POST_MESSAGE,
        method: "POST",
        body: { conversation: arg.id_conversation, text: arg.message },
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
  useGetIfConversationStartedQuery,
  useGetMessageInConversationQuery,
  useStartConversationMutation,
  useDeleteConversationMutation,
  useSendMessageMutation,
} = chatApi;

export default chatApi;
