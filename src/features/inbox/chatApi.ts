import config from "_config";
import { BaseApi } from "_services";
import { conversationTypes } from "./types";

const SOCKET_URL = process.env.EXPO_PUBLIC_API_HOST || "";

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
        const allConversations: conversationTypes[] = resp
          ? resp.map((conversation) => ({
              id: conversation.id,
              participants: conversation.participants.filter(
                (participant) => !participant.is_me,
              ),
              latest_message: conversation.latest_message,
            }))
          : [];
        return allConversations;
      },
      providesTags: [{ type: "Conversation", id: "LIST" }],
    }),
    getIfConversationStarted: build.query<
      boolean,
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
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket(
          `${SOCKET_URL}/ws/conversation/${arg.id_conversation}`,
          ["access_token", `${arg.token || ""}`],
        );
        ws.onopen = (e) => {
          //console.log("Connexion réussi sur le socket message!");
        };

        // verify error
        ws.onclose = (e) => {
          //console.log("error ", e);
          //console.log("Connexion échoué sur le socket message!");
        };
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            console.log("data : ", data.message);
            if (!data) return;

            updateCachedData((draft) => {
              draft.unshift(data.message);
            });
          };

          ws.addEventListener("message", listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close();
      },
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
