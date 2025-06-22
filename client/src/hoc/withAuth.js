"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/auth/useAuth";
import toast from "react-hot-toast";
import Loading from "@/components/common/Loading";

/**
 * @param {React.ComponentType} WrappedComponent - The component to wrap
 * @param {Object} options - Options for customization
 * @param {string} options.redirectTo - Redirect path if unauthenticated
 * @param {boolean} options.showToast - Whether to show a toast on redirect
 * @param {React.ReactNode} options.LoadingComponent - Optional custom loading UI
 * @returns {React.FC}
 */

const withAuth = (
  WrappedComponent,
  {
    redirectTo = "/login",
    showToast = true,
    LoadingComponent = <Loading />,
  } = {}
) => {
  const AuthComponent = (props) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    const router = useRouter();
    const hasRedirected = useRef(false);

    useEffect(() => {
      if (!isLoading && isAuthenticated === false && !hasRedirected.current) {
        hasRedirected.current = true;
        if (showToast) {
          toast("請先登入", { icon: "⚠️" });
        }
        router.replace(redirectTo);
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || isAuthenticated === null) {
      return LoadingComponent;
    }

    return (
      <WrappedComponent
        {...props}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    );
  };

  AuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthComponent;
};

export default withAuth;
