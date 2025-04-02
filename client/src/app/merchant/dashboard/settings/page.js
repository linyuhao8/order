"use client";
import { useState, useEffect } from "react";
//Handling Pages
import SettingTabs from "@/components/merchant/setting/SettingTabs";
//What is displayed on each page
import AccountSettings from "@/components/merchant/setting/tabs/AccountSetting/AccountSettings";
import NotificationSettings from "@/components/merchant/setting/tabs/NotificationSettings";
import PrivacySettings from "@/components/merchant/setting/tabs/PrivacySettings";

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState("account"); //Default

  // Display different pages according to conditions
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
