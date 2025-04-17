"use client";
//context
import { UserContext } from "@/contexts/UserContext";
//hook
import withAuth from "@/hoc/withAuth";
//component
import Button from "@/components/common/Button";
import Tab from "@/components/merchant/Add-Merchant/Tab";
import Header from "@/components/merchant/common/Header/Header";

function AddMerchantPage({ user }) {
  return (
    <UserContext.Provider value={user}>
      <div className="min-h-screen">
        <Header />
        {/* 主要內容區 */}
        <main className="py-10">
          <div className="max-w-7xl mx-auto">
            {/* 頁面標題 */}
            <div className="flex items-center justify-between space-x-5 mb-8">
              <div className="flex items-start space-x-5">
                <div className="pt-1.5">
                  <h1 className="text-2xl font-bold">新增資料</h1>
                  <p className="text-sm font-medium ">管理商家與分類資訊</p>
                </div>
              </div>
              <Button variant="outline" href="/merchant/dashboard/select">
                返回
              </Button>
            </div>

            {/* 選項卡切換 */}
            <Tab />
          </div>
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default withAuth(AddMerchantPage);
