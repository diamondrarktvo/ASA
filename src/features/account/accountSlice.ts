import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthApi from "./authApi";

export interface authState {
  user: {
    id: number | null;
    nickname: string | null;
    email: string | null;
    phone_number: number | null;
    first_name: string | null;
    last_name: string | null;
    date_joined: string | null;
    age: number | null;
    image: string | null;
    is_professional: boolean;
    company_name: string | null;
    unique_company_number: string | null;
  };
  token: string | null;
}

const initialState: authState = {
  user: {
    id: null,
    nickname: null,
    email: null,
    phone_number: null,
    first_name: null,
    last_name: null,
    date_joined: null,
    age: null,
    image: null,
    is_professional: false,
    company_name: null,
    unique_company_number: null,
  },
  token: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<authState>) => {
      if (action.payload.user && action.payload.token) {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    },
  },
  extraReducers: (builder) => {
    builder;
    //.addMatcher()
  },
});

export const selectors = {
  selectCurrentAccount: (state: { account: authState }) => state.account.user,
};

export const { setAccount } = accountSlice.actions;

export default accountSlice;
