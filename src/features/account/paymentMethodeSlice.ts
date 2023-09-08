import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthApi from "./authApi";
import { removeDataToAsyncStorage } from "_utils";

export interface paymentMethodState {
  id: number | null;
  user: string | null;
  name: string | null;
  phone: string | null;
  card_number: string | null;
  expiration_date: string | null;
  cvv: string | null;
}

const initialState: paymentMethodState[] = [];

const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    setPaymentMethod: (state, action: PayloadAction<paymentMethodState>) => {
      state = [...state, action.payload];
    },
  },
  extraReducers: (builder) => {},
});

export const selectors = {
  selectPaymentMethod: (state: { paymentMethod: paymentMethodState }) => state,
};

export const { setPaymentMethod } = paymentMethodSlice.actions;

export default paymentMethodSlice;
