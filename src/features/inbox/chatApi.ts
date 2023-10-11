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
        console.log("resp lele : ", resp);
        const allConversations: newConversationTypesAfterTransform[] | [] = resp
          ? resp.map((conversation) => ({
              id: conversation.id,
              transmitter: conversation.participants.filter(
                (participant) => !participant.is_me,
              )[0],
            }))
          : [];
        return allConversations;
      },
      providesTags: [{ type: "Conversation", id: "LIST" }],
    }),
    getMessageInConversation: build.query<
      conversationTypes[],
      { token: string | undefined; id_conversation: number }
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
  }),
  overrideExisting: true,
});

export const {
  useGetAllConversationsQuery,
  useGetMessageInConversationQuery,
  useStartConversationMutation,
} = chatApi;

export default chatApi;
