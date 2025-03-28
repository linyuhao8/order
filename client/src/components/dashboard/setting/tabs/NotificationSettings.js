"use client";

import { useState } from "react";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: false,
    pushNotifications: false,
  });

  const handleToggle = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="render-tab-content max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Notification Settings
      </h3>

      <form className="space-y-4">
        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="emailNotifications"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email Notifications
          </label>
          <input
            type="checkbox"
            id="emailNotifications"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleToggle}
            className="w-5 h-5 accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="pushNotifications"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Push Notifications
          </label>
          <input
            type="checkbox"
            id="pushNotifications"
            name="pushNotifications"
            checked={settings.pushNotifications}
            onChange={handleToggle}
            className="w-5 h-5 accent-amber-500 cursor-pointer"
          />
        </div>
      </form>
      {/* Save Button */}
      <button
        type="submit"
        className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition duration-200"
      >
        Save Changes
      </button>
    </div>
  );
};

export default NotificationSettings;
