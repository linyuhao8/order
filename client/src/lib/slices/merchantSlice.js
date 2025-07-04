// slices/merchantSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { setCookie, deleteCookie } from "cookies-next/client";

const merchantSlice = createSlice({
  name: "merchant",
  initialState: { data: null },
  reducers: {
    setMerchant: (state, action) => {
      const { id, business_name, merchant_logo } = action.payload;

      const merchantData = JSON.stringify({ id, business_name, merchant_logo });

      setCookie("order-merchant", merchantData, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      state.data = { id, business_name, merchant_logo };
    },
    clearMerchant: (state) => {
      deleteCookie("order-merchant", { path: "/" });
      state.data = null;
    },
  },
});

export const { setMerchant, clearMerchant } = merchantSlice.actions;
export default merchantSlice.reducer;
