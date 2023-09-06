import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface publishStateType {
  product: {
    id: number | null;
    title: string | null;
    description: string | null;
  };
}

const initialState: publishStateType = {
  product: {
    id: null,
    title: null,
    description: null,
  },
};

const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<publishStateType>) => {
      if (action.payload.product) {
        state.product = action.payload.product;
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
