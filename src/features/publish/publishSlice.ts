import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface publishStateType {
  name: string | null;
  description: string | null;
  location: string | null;
  price: number | null;
  sub_category: number | null;
  uploaded_images: string[] | [];
  list_payement_method: string[] | [];
  seller: number | null;
  phone_number_contact: string | null;
  email_contact: string | null;
  national_delivery_price: number | null;
  local_delivery_price: number | null;
  type: string | null;
  quantity: number | null;
  payement_integrate: boolean | null;
  category: number | string | null;
}

const initialState: publishStateType = {
  name: null,
  description: null,
  location: null,
  price: null,
  sub_category: null,
  uploaded_images: [],
  list_payement_method: [],
  seller: null,
  phone_number_contact: null,
  email_contact: null,
  national_delivery_price: null,
  local_delivery_price: null,
  type: null,
  quantity: null,
  payement_integrate: null,
  category: null,
};

const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<publishStateType>) => {
      Object.assign(state, action.payload);
    },
    setCurrentCategorySelected: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    reinitializeProduct: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {},
});

export const selectors = {
  selectProductToPublish: (state: { publish: publishStateType }) =>
    state.publish,
  getCurrentCategorySelected: (state: { publish: publishStateType }) =>
    state.publish.category,
};

export const { setProduct, setCurrentCategorySelected, reinitializeProduct } =
  publishSlice.actions;

export default publishSlice;
