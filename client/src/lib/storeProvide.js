"use client"; // 讓這個 Component 只能在 Client 端執行

import { Provider } from "react-redux";
import { makeStore } from "./store"; // 直接匯入單例 store

export function StoreProvider({ children }) {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
}
