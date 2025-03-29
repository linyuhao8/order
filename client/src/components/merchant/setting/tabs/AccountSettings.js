"use client";

import { useState } from "react";

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  // Form data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/account-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update settings");
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  return (
    <div className="render-tab-content max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Account Settings
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 justify-self-auto">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
            required
            autoComplete="username"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
            required
            autoComplete="email"
          />
        </div>
      </form>
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition duration-200"
      >
        Save Changes
      </button>
    </div>
  );
};

export default AccountSettings;
