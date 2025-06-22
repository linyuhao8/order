"use client";

import { useState, useEffect } from "react";
import { api } from "@/api";
import { getCookie, setCookie, deleteCookie } from "cookies-next/client";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Step 1：從 cookie 快速取出用戶資訊（可能是舊的）
    const userCookie = getCookie("order-user");
    if (userCookie) {
      try {
        const parsed = JSON.parse(userCookie);
        setUser(parsed);
        setIsAuthenticated(true);
        setIsLoading(true); // 雖然有 cookie，還是要 call API 確認
      } catch (err) {
        deleteCookie("order-user");
      }
    }

    // Step 2：call API 二次確認用戶身份
    const checkAuth = async () => {
      try {
        const response = await api.auth.checkAuth();
        const data = await response.json();

        if (!isMounted) return;

        if (response.ok) {
          setIsAuthenticated(true);
          setUser(data.user);

          // 更新 cookie
          setCookie(
            "order-user",
            JSON.stringify({
              id: data.user.id,
              name: data.user.name,
              role: data.user.role,
            }),
            {
              maxAge: 60 * 60 * 24 * 7,
              path: "/",
            }
          );
        } else {
          // token 失效或未登入
          handleUnauthenticated();
        }
      } catch (err) {
        if (!isMounted) return;
        handleUnauthenticated("Auth failed");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    const handleUnauthenticated = (msg = "Unauthorized") => {
      setIsAuthenticated(false);
      setUser(null);
      setError(msg);
      deleteCookie("order-user");
      deleteCookie("order-merchant");
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    isAuthenticated,
    user,
    isLoading,
    error,
  };
};

export default useAuth;
