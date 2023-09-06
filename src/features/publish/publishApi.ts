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
          sub_category: arg.sub_category,
          uploaded_images: arg.uploaded_images,
          list_payement_method: arg.list_payement_method,
          seller: arg.seller,
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
