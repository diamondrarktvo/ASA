import config from "_config";
import { BaseApi } from "_services";
import { notificationResponseType } from "./types";

const inboxApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllNotification: build.query<notificationResponseType[], string>({
      query: (token) => ({
        url: config.GET_ALL_NOTIFICATION_BY_USER_URL,
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }),
      providesTags: [{ type: "Notification", id: "LIST" }],
    }),
  }),
});

export const { useGetAllNotificationQuery } = inboxApi;

export default inboxApi;
