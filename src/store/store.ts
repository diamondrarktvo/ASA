import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { BaseApi } from "_services";
import accountSlice from "../features/account/accountSlice";
import publishSlice from "../features/publish/publishSlice";
import paymentMethodSlice from "../features/account/paymentMethodeSlice";
import checkoutSlice from "../features/search/checkoutSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [BaseApi.reducerPath]: BaseApi.reducer,
    [accountSlice.name]: accountSlice.reducer,
    [publishSlice.name]: publishSlice.reducer,
    [paymentMethodSlice.name]: paymentMethodSlice.reducer,
    [checkoutSlice.name]: checkoutSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BaseApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
/*store.subscribe(() => {
  console.log("State ato amin'ny storee : ");
  console.log(store.getState());
});*/

export type AppDispatch = typeof store.getState;
export type RootState = ReturnType<typeof store.getState>;
