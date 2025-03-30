"use client";
import { useState, useEffect } from "react";
import SettingTabs from "./SettingTabs";
import AccountSettings from "./tabs/AccountSettings";
import NotificationSettings from "./tabs/NotificationSettings";
import PrivacySettings from "./tabs/PrivacySettings";

const SettingPage = ({ settingActiveTab }) => {
  const [activeTab, setActiveTab] = useState(settingActiveTab); //Default

  useEffect(() => {
    console.log(settingActiveTab);
  }, [settingActiveTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "privacy":
        return <PrivacySettings />;
      // display page
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="settings-container flex flex-col md:flex-row">
      <SettingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="settings-content p-4">{renderTabContent()}</div>
    </div>
  );
};

export default SettingPage;
