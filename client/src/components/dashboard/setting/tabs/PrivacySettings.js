"use client";

import { useState } from "react";

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    twoFactor: false,
    dataSharing: false,
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
        Privacy Settings
      </h3>

      <form className="space-y-4">
        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="twoFactor"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Two-Factor Authentication
          </label>
          <input
            type="checkbox"
            id="twoFactor"
            name="twoFactor"
            checked={settings.twoFactor}
            onChange={handleToggle}
            className="w-5 h-5 accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Data Sharing */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="dataSharing"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Data Sharing
          </label>
          <input
            type="checkbox"
            id="dataSharing"
            name="dataSharing"
            checked={settings.dataSharing}
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

export default PrivacySettings;
