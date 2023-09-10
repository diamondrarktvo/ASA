import config from "_config";
import { BaseApi } from "_services";

const publishApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    publishProduct: build.mutation({
      query: (arg) => ({
        url: config.POST_PRODUCT_URL,
        method: "POST",
        body: {
          name: arg.name,
          description: arg.description,
          location: arg.location,
          price: arg.price,
          sub_category_id: arg.sub_category_id,
          uploaded_images: arg.uploaded_images,
          list_payement_method: arg.list_payement_method,
          seller: arg.seller,
          payement_integrate: arg.payement_integrate,
          quantity: arg.quantity,
          type: arg.type,
          local_delivery_price: arg.local_delivery_price,
          national_delivery_price: arg.national_delivery_price,
          email_contact: arg.email_contact,
          phone_number_contact: arg.phone_number_contact,
        },
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const { usePublishProductMutation } = publishApi;

export default publishApi;
