"use client"; // This directive ensures the file is treated as a client component in Next.js.

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/api";

//使用方法const { isAuthenticated, user } = useAuth(true);
//當傳入參數為true，如用戶未登入會自動導向

//When redirectIfUnauthenticated is true, unregistered users will be redirected and will not be able to access the page.
const useAuth = (redirectIfUnauthenticated = false) => {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // State to store user information
  const [user, setUser] = useState(null);
  // Next.js router instance for navigation
  const router = useRouter();

  useEffect(() => {
    // Function to check user authentication status
    const checkAuthentication = async () => {
      try {
        const response = await api.auth.checkAuth(); // Call the authentication API
        const data = await response.json();

        if (response.ok) {
          // If authentication is successful, update state
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          // If authentication fails, reset state and redirect if needed
          setIsAuthenticated(false);
          setUser(null);
          if (redirectIfUnauthenticated) {
            router.push("/login"); // Redirect to login page
          }
        }
      } catch (error) {
        // Handle errors, reset state, and redirect if required
        setIsAuthenticated(false);
        setUser(null);
        if (redirectIfUnauthenticated) {
          router.push("/login");
        }
      }
    };

    checkAuthentication();
  }, [router, redirectIfUnauthenticated]); // Re-run effect when dependencies change

  return { isAuthenticated, user }; // Return authentication status and user data
};

export default useAuth; // Export the custom hook
