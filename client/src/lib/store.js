import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice"; // 匯入主題的 reducer

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer, // 註冊 theme slice
    },
  });
};
