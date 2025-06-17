"use client";
//component
import Button from "@/components/common/Button";
import Tabs from "@/components/merchant/option/OptionTabs";

const OptionManagement = ({ user, active, merchantId }) => {
  return (
    <div className="min-h-screen">
      {/* 主要內容區 */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto">
          {/* 頁面標題 */}
          <div className="flex items-center justify-between space-x-5 mb-8">
            <div className="flex items-start space-x-5">
              <div className="pt-1.5">
                <h1 className="text-2xl font-bold">Option Manager</h1>
                <p className="text-sm font-medium ">管理選單</p>
              </div>
            </div>
            <Button variant="outline" href={`/merchant/dashboard/`}>
              back
            </Button>
          </div>

          {/* 選項卡切換 可以切換產品或菜單*/}
          <Tabs active={active} user={user} />
        </div>
      </main>
    </div>
  );
};

export default OptionManagement;
