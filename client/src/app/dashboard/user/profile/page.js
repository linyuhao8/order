"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//hook
import useAuth from "@/hooks/auth/useAuth";

const ProfilePage = () => {
  const router = useRouter();
  // If authentication fails, it will automatically redirect to the login page.
  const { isAuthenticated, user } = useAuth(true);

  useEffect(() => {
    // If the validation is successful, jump to the corresponding Profile page.
    if (isAuthenticated && user) {
      router.push(`/dashboard/user/profile/${user.id}`);
    }
  }, [isAuthenticated, user, router]);

  return <div className="w-full md:ml-64 p-4 md:p-6">Loading...</div>; // 加載頁面時顯示 Loading
};

export default ProfilePage;
