"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import OptionListByUser from "@/components/merchant/option/OptionListByUser";
import OptionListByMerchant from "./OptionListByMerchant";

const OptionTabs = ({ user, active }) => {
  const [activeTab, setActiveTab] = useState(active || "user");

  if (!user) return null;

  return (
    <>
      {/* 選項卡切換 */}
      <div className="mb-8">
        {/* 手機版 Tab */}
        <div className="sm:hidden">
          <label htmlFor="option-tabs" className="sr-only">
            選擇選項來源
          </label>
          <select
            id="option-tabs"
            name="option-tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="user">我的選項（User）</option>
            <option value="merchant">商家選項（Merchant）</option>
            <option value="global">全站選項（Global）</option>
          </select>
        </div>

        {/* 桌機版 Tab */}
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
              <Button
                onClick={() => setActiveTab("user")}
                variant={activeTab === "user" ? "activeTab" : "tab"}
              >
                我的選項
              </Button>
              <Button
                onClick={() => setActiveTab("merchant")}
                variant={activeTab === "merchant" ? "activeTab" : "tab"}
              >
                商家選項
              </Button>
              <Button
                onClick={() => setActiveTab("global")}
                variant={activeTab === "global" ? "activeTab" : "tab"}
              >
                全站選項
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* 根據 activeTab 渲染內容 */}

      {activeTab === "user" && <OptionListByUser userId={user.id} />}
      {activeTab === "merchant" && <OptionListByMerchant user={user} />}
    </>
  );
};

export default OptionTabs;
