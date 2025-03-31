"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/withAuth";

const ProfilePage = ({ isAuthenticated, user }) => {
  const router = useRouter();
  // ✅ Get data directly from withAuth props
  useEffect(() => {
    if (isAuthenticated && user) {
      const targetPath = `/merchant/dashboard/user/profile/${user.id}`;
      if (router.pathname !== targetPath) {
        router.replace(targetPath);
      }
    }
  }, [isAuthenticated, user, router]);

  return <div>Loading...</div>;
};

export default withAuth(ProfilePage);
