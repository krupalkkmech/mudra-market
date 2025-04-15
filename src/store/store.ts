import { configureStore } from "@reduxjs/toolkit";

import cryptoReducer from "./reducers";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
