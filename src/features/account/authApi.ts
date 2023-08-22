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
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = AuthApi;

export default AuthApi;
