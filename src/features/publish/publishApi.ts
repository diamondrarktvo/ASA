import config from "_config";
import { BaseApi } from "_services";
import { publishStateType } from "./publishSlice";

type publishProps = { valueForStepper: publishStateType; token: string };

const publishApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    publishProduct: build.mutation<undefined | null, publishProps>({
      query: (arg) => ({
        url: config.POST_PRODUCT_URL,
        method: "POST",
        body: {
          name: arg.valueForStepper.name,
          description: arg.valueForStepper.description,
          location: arg.valueForStepper.location,
          price: arg.valueForStepper.price,
          sub_category: arg.valueForStepper.sub_category,
          uploaded_images: arg.valueForStepper.uploaded_images,
          payement_method: arg.valueForStepper.payement_method,
          seller: arg.valueForStepper.seller,
          payement_integrate: arg.valueForStepper.payement_integrate,
          product_criteria: arg.valueForStepper.product_criteria,
          quantity: arg.valueForStepper.quantity,
          type: arg.valueForStepper.type,
          local_delivery_price: arg.valueForStepper.local_delivery_price,
          national_delivery_price: arg.valueForStepper.national_delivery_price,
          email_contact: arg.valueForStepper.email_contact,
          phone_number_contact: arg.valueForStepper.phone_number_contact,
        },
        headers: {
          Authorization: `token ${arg.token}`,
        },
      }),
      invalidatesTags: ["Announce"],
    }),
  }),
  overrideExisting: true,
});

export const { usePublishProductMutation } = publishApi;

export default publishApi;
