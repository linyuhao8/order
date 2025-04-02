import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/lib/slices/themeSlice";
import authReducer from "@/lib/slices/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      auth: authReducer,
    },
  });
};
