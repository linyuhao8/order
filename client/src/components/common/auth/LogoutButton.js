"use client";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/auth/useLogout";
import { useState } from "react";
import Button from "@/components/common/Button";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = ({ variant, size, isHome }) => {
  const router = useRouter();
  const { logout } = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true); 
    await logout(); 
    router.push("/login");
    setIsLoggingOut(false); 
  };

  return (
    <div>
      <Button
        size={size}
        onClick={handleLogout}
        icon={FaSignOutAlt}
        disabled={isLoggingOut}
        variant={variant}
      >
        {/* home page on text */}
        {!isHome ? (isLoggingOut ? "log out..." : "logout") : null}
      </Button>
    </div>
  );
};

export default LogoutButton;
