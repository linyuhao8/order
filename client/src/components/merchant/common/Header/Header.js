"use client";
import ThemeButton from "@/components/common/ui/ThemeButton";
import SettingButton from "../SettingButton";
import useModal from "@/hooks/ui/useModal";
import Button from "@/components/common/Button";
import MerchantSelectorModal from "./MerchantSelectorModal";
import { useMerchant } from "@/hooks/useMerchant";

const Header = ({ name, user, status = "active" }) => {
  const [isModalOpen, openModal, closeModal] = useModal();
  const handleOpen = () => {
    openModal();
  };
  const { merchant, setCurrentMerchant, clearCurrentMerchant } = useMerchant();

  return (
    <>
      {/* 背景裝飾 */}
      <div className="absolute top-0 left-0 w-full h-32"></div>

      <header className="relative backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 mb-8 p-6">
        {/* 裝飾性漸層邊框 */}
        <div className="absolute inset-0 rounded-2xl -z-10"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
          {/* 左側標題區域 */}
          <div className="relative">
            <div className="flex items-center space-x-3 mb-2">
              {/* 裝飾性圖標 */}
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">
                {name}
              </h1>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
              線上點餐平台管理系統
            </p>
          </div>

          {/* 右側控制區域 */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 狀態指示器 - 重新設計 */}
            <div className="flex items-center space-x-2">
              <div
                className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  status === "active"
                    ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200"
                    : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200"
                }`}
              >
                <div
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full ${
                    status === "active"
                      ? "bg-emerald-500 animate-pulse"
                      : "bg-red-500"
                  }`}
                ></div>
                <span className="ml-3">
                  {status === "active" ? "營業中" : "休息中"}
                </span>
              </div>
            </div>

            {/* 商家選擇按鈕 - 優化設計 */}
            <Button variant="outline" onClick={handleOpen}>
              <span className="relative z-10">
                {merchant ? merchant?.business_name : "Please Create Merchant"}
              </span>
              {/* 懸停效果背景 */}
            </Button>

            {/* 主題切換按鈕 */}
            <ThemeButton variant={"icon"} />

            {/* 設置按鈕 */}
            <SettingButton user={user} />
          </div>
        </div>
      </header>

      <MerchantSelectorModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        user={user}
      />
    </>
  );
};

export default Header;
