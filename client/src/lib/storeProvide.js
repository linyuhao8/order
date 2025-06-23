"use client";

import { Provider } from "react-redux";
import store from "./store"; // 直接 import 已建立好的 store

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
