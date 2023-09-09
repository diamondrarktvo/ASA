import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface publishStateType {
  name: string;
  description: string;
  location: string;
  price: number;
  sub_category: number;
  uploaded_images: string[] | [];
  list_payement_method: string[] | [];
  seller: number;
  phone_number_contact: string;
  email_contact: string;
  national_delivery_price: number;
  local_delivery_price: number;
  type: string;
  quantity: number;
  payement_integrate: boolean;
  category: number;
}

const initialState: publishStateType = {
  name: "",
  description: "",
  location: "",
  price: 0,
  sub_category: 0,
  uploaded_images: [],
  list_payement_method: [],
  seller: 0,
  phone_number_contact: "",
  email_contact: "",
  national_delivery_price: 0,
  local_delivery_price: 0,
  type: "",
  quantity: 0,
  payement_integrate: false,
  category: 0,
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
