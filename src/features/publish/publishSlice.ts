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
  },
  extraReducers: (builder) => {},
});

export const selectors = {
  selectProduct: (state: { publish: publishStateType }) =>
    state.publish.product,
};

export const { setProduct } = publishSlice.actions;

export default publishSlice;
