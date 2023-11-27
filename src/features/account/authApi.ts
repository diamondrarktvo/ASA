import config from "_config";
import { BaseApi } from "_services";

const AuthApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (arg) => ({
        url: config.LOGIN_URL,
        method: "POST",
        body: { phone_number: arg.phone_number, password: arg.password },
      }),
    }),
    register: build.mutation({
      query: (arg) => ({
        url: config.REGISTER_URL,
        method: "POST",
        body: arg,
      }),
    }),
    update: build.mutation({
      query: (arg) => {
        console.log("arg : ", arg.body);
        return {
          url: config.GET_USER_URL,
          method: "PUT",
          body: arg.body,
          headers: {
            Authorization: `token ${arg.token}`,
          },
        };
      },
    }),
    getUser: build.query({
      query: (arg) => ({
        url: config.GET_USER_URL + "/" + arg.id,
        method: "GET",
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateMutation,
  useGetUserQuery,
} = AuthApi;

export default AuthApi;
