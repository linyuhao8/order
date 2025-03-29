"use client";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/auth/useLogout";
import { useState } from "react";
import Button from "@/components/common/Button"; // 引入通用的 Button 組件
import { FaSignOutAlt } from "react-icons/fa"; // 引入登出圖標
import { IoLogOutSharp } from "react-icons/io5";

const LogoutButton = ({ variant, size, isHome }) => {
  const router = useRouter();
  const { logout } = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true); // 顯示 loading 狀態

    await logout(); // 執行登出邏輯

    setIsLoggingOut(false); // 隱藏 loading 狀態

    router.push("/login");
  };

  return (
    <div>
      {/* 按鈕前面加上圖標 */}
      <Button
        size={size}
        onClick={handleLogout}
        icon={IoLogOutSharp}
        disabled={isLoggingOut}
        variant={variant}
      >
        {!isHome ? (isLoggingOut ? "log out..." : "logout") : null}
      </Button>
    </div>
  );
};

export default LogoutButton;
