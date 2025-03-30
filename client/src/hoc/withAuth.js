"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/auth/useAuth";
import toast from "react-hot-toast";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { isAuthenticated, user } = useAuth(true);
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated === false) {
        toast("請先登入", { icon: "⚠️" });
      }
    }, [isAuthenticated]);

    if (isAuthenticated === null) {
      return <div>Loading...</div>; // 骨架屏或 loading 效果
    }

    return (
      <WrappedComponent
        {...props}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    );
  };

  // ✅ 修正：加上 displayName 讓 React DevTools 能辨識組件
  AuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthComponent;
};

export default withAuth;
