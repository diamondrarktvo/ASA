import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthApi from "./authApi";
import { removeDataToAsyncStorage } from "_utils";

export interface paymentMethodStateType {
  id: number | null;
  user: string | null;
  name_mobile_money: string | null;
  type: string;
  phone: string | null;
  card_number: string | null;
  expiration_date: string | null;
  cvv: string | null;
  paypal_email: string | null;
}

const initialState: paymentMethodStateType[] = [];

const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    setPaymentMethod: (
      state,
      action: PayloadAction<paymentMethodStateType>,
    ) => {
      console.log("Action payload pay: ", action.payload);
      state = [...state, action.payload];
    },
  },
  extraReducers: (builder) => {},
});

export const selectors = {
  selectPaymentMethod: (state: { paymentMethod: paymentMethodStateType[] }) =>
    state.paymentMethod,
};

export const { setPaymentMethod } = paymentMethodSlice.actions;

export default paymentMethodSlice;
