// slices/merchantSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { setCookie, deleteCookie } from "cookies-next/client";

const merchantSlice = createSlice({
  name: "merchant",
  initialState: { data: null },
  reducers: {
    setMerchant: (state, action) => {
      const {
        id,
        user_id,
        business_name,
        description,
        merchant_logo_id,
        feature,
        location,
        business_hours,
        is_active,
        image_id,
      } = action.payload;

      const merchantData = JSON.stringify({
        id,
        user_id,
        business_name,
        description,
        merchant_logo_id,
        feature,
        location,
        business_hours,
        is_active,
        image_id,
      });

      setCookie("order-merchant", merchantData, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      state.data = {
        id,
        user_id,
        business_name,
        description,
        merchant_logo_id,
        feature,
        location,
        business_hours,
        is_active,
        image_id,
      };
    },
    clearMerchant: (state) => {
      deleteCookie("order-merchant", { path: "/" });
      state.data = null;
    },
  },
});

export const { setMerchant, clearMerchant } = merchantSlice.actions;
export default merchantSlice.reducer;
