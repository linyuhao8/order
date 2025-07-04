// hooks/useLogout.ts
import axios from "axios";
import { deleteCookie } from "cookies-next/client";
import { useMerchant } from "../useMerchant";

export const useLogout = () => {
  const { clearCurrentMerchant } = useMerchant();
  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        deleteCookie("order-user");
        clearCurrentMerchant();
        return { success: true, message: response.data.message };
      } else {
        return {
          success: false,
          message: response.data.message || "Logout Failure",
        };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Logout Error",
      };
    }
  };

  return { logout };
};
