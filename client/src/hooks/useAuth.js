"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/api";

const useAuth = (redirectIfUnauthenticated = false) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await api.auth.checkAuth();
        const data = await response.json();

        if (response.ok) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
          if (redirectIfUnauthenticated) {
            router.push("/login");
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        if (redirectIfUnauthenticated) {
          router.push("/login");
        }
      }
    };

    checkAuthentication();
  }, [router, redirectIfUnauthenticated]);

  return { isAuthenticated, user };
};

export default useAuth;
