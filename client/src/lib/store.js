import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import loginSlice from "./slices/loginSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      auth: loginSlice,
    },
  });
};
