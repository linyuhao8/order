"use client";

import { useState, useEffect } from "react";

// Handling Pages
import SettingTabs from "@/components/merchant/setting/SettingTabs";

// What is displayed on each page
import AccountSettings from "@/components/merchant/setting/tabs/AccountSetting/AccountSettings";
import NotificationSettings from "@/components/merchant/setting/tabs/NotificationSettings";
import PrivacySettings from "@/components/merchant/setting/tabs/PrivacySettings";
import Loading from "@/components/common/Loading";

const Setting = ({ settingActiveTab = "account", user }) => {
  const [activeTab, setActiveTab] = useState(settingActiveTab);

  // Optional: update tab if props changes
  useEffect(() => {
    setActiveTab(settingActiveTab);
  }, [settingActiveTab]);

  if (!user) return <Loading />;

  const userId = user ? user.id : null;

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings userId={userId} />;
      case "notifications":
        return <NotificationSettings userId={userId} />;
      case "privacy":
        return <PrivacySettings userId={userId} />;
      default:
        return <AccountSettings userId={userId} />;
    }
  };

  return (
    <div className="settings-container flex flex-col md:flex-row">
      <SettingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="settings-content p-4 w-full">{renderTabContent()}</div>
    </div>
  );
};

export default Setting;
