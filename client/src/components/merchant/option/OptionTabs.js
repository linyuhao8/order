"use client";

import Button from "@/components/common/Button";
import OptionListByUser from "@/components/merchant/option/OptionListByUser";
import OptionListByMerchant from "./OptionListByMerchant";

const OptionTabs = ({
  activeTab,
  setActiveTab,
  getOptionByUserData,
  getOptionByUserLoading,
  getOptionByUserRefetch,
  getAllMerchantByUserData,
  getAllMerchantByUserLoading,
  refreshKey,
}) => {
  return (
    <>
      {/* 選項卡切換 */}
      <div className="mb-8">
        {/* phone Tab */}
        <div className="sm:hidden">
          <label htmlFor="option-tabs" className="sr-only">
            Selecting an option source
          </label>
          <select
            id="option-tabs"
            name="option-tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="user">My Option(By User ID)</option>
            <option value="merchant">Merchant option(By Option ID)</option>
            <option value="global">Global(not yet)</option>
          </select>
        </div>

        {/* desktop Tab */}
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
              <Button
                onClick={() => setActiveTab("user")}
                variant={activeTab === "user" ? "activeTab" : "tab"}
              >
                My Option(By User ID)
              </Button>
              <Button
                onClick={() => setActiveTab("merchant")}
                variant={activeTab === "merchant" ? "activeTab" : "tab"}
              >
                Merchant option(By Option ID)
              </Button>
              <Button
                onClick={() => setActiveTab("global")}
                variant={activeTab === "global" ? "activeTab" : "tab"}
              >
                Global(not yet)
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* render content based on activeTab */}
      {activeTab === "user" && (
        <OptionListByUser
          optionData={getOptionByUserData}
          optionLoading={getOptionByUserLoading}
          getOptionByUserRefetch={getOptionByUserRefetch}
        />
      )}
      {activeTab === "merchant" && (
        <OptionListByMerchant
          merchantData={getAllMerchantByUserData}
          merchantLoading={getAllMerchantByUserLoading}
          refreshKey={refreshKey}
        />
      )}
      {activeTab === "global" && <div>This feature has not been added yet</div>}
    </>
  );
};

export default OptionTabs;
