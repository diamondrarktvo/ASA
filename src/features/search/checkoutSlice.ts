import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { annonceType } from "./types";

export type cartStateType = annonceType;

const initialState: cartStateType | {} = {};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<cartStateType>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const selectors = {
  selectCart: (state: { checkout: cartStateType }) => state.checkout,
};

export const { setCart } = checkoutSlice.actions;

export default checkoutSlice;
