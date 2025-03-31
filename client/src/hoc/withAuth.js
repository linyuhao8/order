"use client"; // ✅ This directive ensures the component runs on the client side

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/auth/useAuth";
import toast from "react-hot-toast";

/**
 * A higher-order component (HOC) that wraps a component
 * and ensures the user is authenticated before rendering it.
 *
 * @param {React.ComponentType} WrappedComponent - The component to wrap.
 * @returns {React.FC} - A new component that handles authentication.
 */
const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    // Retrieve authentication state and user data
    const { isAuthenticated, user } = useAuth(true);
    const router = useRouter();

    useEffect(() => {
      // If the user is not authenticated, show a warning toast
      if (isAuthenticated === false) {
        toast("請先登入", { icon: "⚠️" });
      }
    }, [isAuthenticated]);

    // Show a loading state while authentication status is being determined
    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    // Render the wrapped component with authentication props
    return (
      <WrappedComponent
        {...props}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    );
  };

  // ✅ Set displayName for better debugging in React DevTools
  AuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthComponent;
};

export default withAuth;
