"use client";
//component
import Button from "@/components/common/Button";
import Tab from "./Tab";
import Loading from "@/components/common/Loading";
const AddPage = ({ active, merchantId }) => {
  if ((!active, !merchantId)) return <Loading />;
  return (
    <div className="min-h-screen">
      {/* 主要內容區 */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto">
          {/* 頁面標題 */}
          <div className="flex items-center justify-between space-x-5 mb-8">
            <div className="flex items-start space-x-5">
              <div className="pt-1.5">
                <h1 className="text-2xl font-bold">Add Menu</h1>
                <p className="text-sm font-medium ">Fill field</p>
              </div>
            </div>
            <Button
              variant="outline"
              href={`/merchant/dashboard/${merchantId}`}
            >
              back
            </Button>
          </div>

          {/* 選項卡切換 可以切換產品或菜單*/}
          <Tab active={active} merchantId={merchantId} />
        </div>
      </main>
    </div>
  );
};

export default AddPage;
