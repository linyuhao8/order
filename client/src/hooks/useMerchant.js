// hooks/useMerchant.ts
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import { setMerchant, clearMerchant } from "@/lib/slices/merchantSlice";

export function useMerchant() {
  const dispatch = useDispatch();
  const merchantRedux = useSelector((state) => state.merchant.data);

  // ✅ fallback 檢查 Redux → cookie
  const getMerchant = () => {
    if (merchantRedux) return merchantRedux;

    try {
      const cookie = getCookie("order-merchant");
      if (!cookie) return null;
      const parsed = JSON.parse(cookie);
      if (parsed?.id && parsed?.business_name) {
        return parsed;
      }
    } catch (err) {
      console.error("商家 cookie 解析失敗", err);
    }

    return null;
  };

  const setCurrentMerchant = (merchant) => dispatch(setMerchant(merchant));
  const clearCurrentMerchant = () => dispatch(clearMerchant());

  return {
    merchant: getMerchant(), // 🔁 always checked
    setCurrentMerchant,
    clearCurrentMerchant,
  };
}
