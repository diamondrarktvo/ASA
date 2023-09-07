import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface publishStateType {
  product: {
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
  };
}

const initialState: publishStateType = {
  product: {
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
  },
};

const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<publishStateType>) => {
      if (action.payload.product) {
        state.product = { ...state.product, ...action.payload.product };
      }
    },
    reinitializeProduct: (state) => {
      state.product = initialState.product;
    },
  },
  extraReducers: (builder) => {},
});

export const selectors = {
  selectProduct: (state: { publish: publishStateType }) =>
    state.publish.product,
};

export const { setProduct } = publishSlice.actions;

export default publishSlice;
