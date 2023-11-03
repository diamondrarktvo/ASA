import config from "_config";
import { BaseApi } from "_services";

type deleteProps = {
  id: number;
  token: string;
};

const paymentMethodApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    addPaymentMethod: build.mutation({
      query: (arg) => ({
        url: config.POST_PAYMENT_METHOD_URL,
        method: "POST",
        body: { phone: arg.phone, type: arg.type },
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
      invalidatesTags: ["paymentMethod"],
    }),
    getAllPaymentMethod: build.query({
      query: (arg) => ({
        url: config.GET_PAYMENT_METHOD_URL,
        method: "GET",
        headers: {
          Authorization: `token ${arg}`,
        },
      }),
      providesTags: [{ type: "paymentMethod", id: "LIST" }],
    }),
    deleteOnePaymentMethod: build.mutation<undefined | null, deleteProps>({
      query: (arg) => ({
        url: `${config.DELETE_PAYMENT_METHOD_URL}/${arg.id}`,
        method: "DELETE",
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
      invalidatesTags: ["paymentMethod"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddPaymentMethodMutation,
  useGetAllPaymentMethodQuery,
  useDeleteOnePaymentMethodMutation,
} = paymentMethodApi;

export default paymentMethodApi;
