"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import withAuth from "@/hoc/withAuth";
import Loading from "@/components/common/Loading";

const ProfilePage = ({ isAuthenticated, user }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      const targetPath = `/merchant/dashboard/user/profile/${user.id}`;
      if (pathname !== targetPath) {
        router.replace(targetPath);
      }
    }
  }, [isAuthenticated, user?.id, pathname, router]);

  return <Loading />;
};

export default withAuth(ProfilePage);
