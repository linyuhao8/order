"use client";
//context
import { UserContext } from "@/contexts/UserContext";
//component
import Button from "@/components/common/Button";
import TabContainer from "@/components/merchant/Add-Merchant/TabContainer";

const MerchantCreateTabs = ({ user }) => {
  return (
    <UserContext.Provider value={user}>
      <div className="min-h-screen">
        {/* 主要內容區 */}
        <main className="py-10">
          <div className="max-w-7xl mx-auto">
            {/* 頁面標題 */}
            <div className="flex items-center justify-between space-x-5 mb-8">
              <div className="flex items-start space-x-5">
                <div className="pt-1.5">
                  <h1 className="text-2xl font-bold">Fill field</h1>
                  <p className="text-sm font-medium ">
                    Manage Merchant and Category Information
                  </p>
                </div>
              </div>
              <Button variant="outline" href="/merchant/dashboard">
                back
              </Button>
            </div>

            {/* 選項卡切換 */}
            <TabContainer />
          </div>
        </main>
      </div>
    </UserContext.Provider>
  );
};

export default MerchantCreateTabs;
