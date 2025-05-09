// services/api/auth.js
export const authApi = {
  checkAuth: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/check-auth`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};
