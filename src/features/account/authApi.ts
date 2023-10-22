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
      query: (arg) => ({
        url: config.UPDATE_URL,
        method: "PUT",
        body: {
          first_name: arg.first_name,
          last_name: arg.last_name,
          nickname: arg.nickname,
          age: arg.age,
          email: arg.email,
          phone_number: arg.phone_number,
          is_professional: arg.is_professional,
          company_name: arg.company_name,
          unique_company_number: arg.unique_company_number,
        },
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useRegisterMutation, useUpdateMutation } =
  AuthApi;

export default AuthApi;
