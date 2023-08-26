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
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useRegisterMutation } = AuthApi;

export default AuthApi;
