import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface publishStateType {
  name: string;
  description: string;
  location: string;
  price: number;
  sub_category_id: number;
  sub_category_name: string;
  uploaded_images: { base64: string }[] | [];
  list_payement_method: string[] | [];
  product_criteria: { criteria: number; value: string | number }[] | [];
  seller: number;
  phone_number_contact: string;
  email_contact: string;
  national_delivery_price: number;
  local_delivery_price: number;
  type: string;
  quantity: number;
  payement_integrate: boolean;
}

const initialState: publishStateType = {
  name: "",
  description: "",
  location: "",
  price: 0,
  sub_category_id: 0,
  sub_category_name: "",
  uploaded_images: [],
  list_payement_method: [],
  product_criteria: [],
  seller: 0,
  phone_number_contact: "",
  email_contact: "",
  national_delivery_price: 0,
  local_delivery_price: 0,
  type: "",
  quantity: 0,
  payement_integrate: false,
};

const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<publishStateType>) => {
      Object.assign(state, action.payload);
    },
    reinitializeProduct: (state) => {
      state = {
        name: "",
        description: "",
        location: "",
        price: 0,
        sub_category_id: 0,
        sub_category_name: "",
        uploaded_images: [],
        list_payement_method: [],
        product_criteria: [],
        seller: 0,
        phone_number_contact: "",
        email_contact: "",
        national_delivery_price: 0,
        local_delivery_price: 0,
        type: "",
        quantity: 0,
        payement_integrate: false,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const selectors = {
  selectProductToPublish: (state: { publish: publishStateType }) =>
    state.publish,
  getCurrentSubCategorySelected: (state: { publish: publishStateType }) =>
    state.publish.sub_category_id,
};

export const { setProduct, reinitializeProduct } = publishSlice.actions;

export default publishSlice;
