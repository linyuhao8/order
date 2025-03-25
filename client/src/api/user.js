// services/api/user.js
export const userApi = {
  getUser: async (id, token) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // Conditionally add Authorization header
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
};
