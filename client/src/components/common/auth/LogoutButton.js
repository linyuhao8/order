"use client";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/auth/useLogout";
import { useState } from "react";
import Button from "@/components/common/Button";
import { FaSignOutAlt } from "react-icons/fa";

import toast from "react-hot-toast";

const LogoutButton = ({ variant, size, isHome }) => {
  const router = useRouter();
  const { logout } = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    toast.loading("Logging out...");

    try {
      await logout();
      toast.dismiss();
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      toast.dismiss();
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
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
