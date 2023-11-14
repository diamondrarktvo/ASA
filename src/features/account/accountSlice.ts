import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthApi from "./authApi";
import { removeDataToAsyncStorage } from "_utils";

export interface authState {
  user: {
    id: number;
    nickname: string;
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    date_joined: string;
    age: number;
    image: string;
    is_professional: boolean;
    company_name: string;
    unique_company_number: string;
  };
  token: string;
  is_account_connected: boolean;
}

const initialState: authState = {
  user: {
    id: 0,
    nickname: "",
    email: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    date_joined: "",
    age: 0,
    image: "",
    is_professional: false,
    company_name: "",
    unique_company_number: "",
  },
  token: "",
  is_account_connected: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<authState>) => {
      if (action.payload.user && action.payload.token) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.is_account_connected = !state.is_account_connected;
      }
    },
    removeAccount: (state) => {
      state.user = initialState.user;
      state.token = initialState.token;
      state.is_account_connected = false;
      removeDataToAsyncStorage("token");
      removeDataToAsyncStorage("current_account");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      AuthApi.endpoints.update.matchFulfilled,
      (state, action) => {
        if (action.payload) {
          Object.assign(state.user, action.payload);
        }
      },
    );
  },
});

export const selectors = {
  selectCurrentAccount: (state: { account: authState }) => state.account.user,
};

export const { setAccount, removeAccount } = accountSlice.actions;

export default accountSlice;
