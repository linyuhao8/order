import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/lib/slices/themeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
  });
};
