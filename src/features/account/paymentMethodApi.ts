import config from "_config";
import { BaseApi } from "_services";

const paymentMethodApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    addPaymentMethod: build.mutation({
      query: (arg) => ({
        url: config.POST_PAYMENT_METHOD_URL,
        method: "POST",
        body: { phone: arg.phone, name: arg.name },
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
    }),
    getAllPaymentMethod: build.query({
      query: (arg) => ({
        url: config.GET_PAYMENT_METHOD_URL,
        method: "GET",
        headers: {
          Authorization: `token ${arg}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useAddPaymentMethodMutation, useGetAllPaymentMethodQuery } =
  paymentMethodApi;

export default paymentMethodApi;
