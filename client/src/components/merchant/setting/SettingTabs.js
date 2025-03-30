const SettingTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="px-5 md:w-[180px] mw-full bg-gray-50 pt-5 rounded-t-xl md:rounded-l-xl">
      <h2 className="text-2xl mb-3 text-black dark:text-white">Settings</h2>
      <div className="settings-tabs flex flex-col items-start">
        <button
          className={activeTab === "account" ? "active" : ""}
          onClick={() => setActiveTab("account")}
        >
          Account
        </button>
        <button
          className={activeTab === "notifications" ? "active" : ""}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </button>
        <button
          className={activeTab === "privacy" ? "active" : ""}
          onClick={() => setActiveTab("privacy")}
        >
          Privacy
        </button>
      </div>
    </div>
  );
};

export default SettingTabs;
