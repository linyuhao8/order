"use client";
import ThemeButton from "@/components/common/ui/ThemeButton";
import SettingButton from "../SettingButton";
import useModal from "@/hooks/ui/useModal";
import Button from "@/components/common/Button";
import MerchantSelectorModal from "./MerchantSelectorModal";
import { useMerchant } from "@/hooks/useMerchant";
import { MdStorefront } from "react-icons/md";
import Image from "next/image";
import useFetch from "@/hooks/api/useFetch";
import { useEffect } from "react";

const Header = ({ name, user }) => {
  const [isModalOpen, openModal, closeModal] = useModal();
  const handleOpen = () => {
    openModal();
  };

  const { merchant, setCurrentMerchant } = useMerchant();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8082";
  const putMerchantUrl = merchant?.id
    ? `${baseUrl}/api/merchants/${merchant.id}`
    : null;
  const { refetch: putMerchant } = useFetch(putMerchantUrl, {
    withCredentials: true,
    enabled: false,
  });

  useEffect(() => {
    console.log(merchant);
  }, [merchant]);
  const handleToggleStatus = async () => {
    if (!merchant) return;

    // 準備 payload：只挑要送的欄位
    const payload = {
      user_id: merchant.user_id,
      business_name: merchant.business_name,
      description: merchant.description,
      feature: merchant.feature,
      location: merchant.location,
      image_id: merchant.image_id,
      merchant_logo_id: merchant.merchant_logo_id,
      business_hours: merchant.business_hours,
      is_active: !merchant.is_active, // ✅ 根據現有狀態反轉
    };

    try {
      await putMerchant({
        method: "PUT",
        body: payload,
      });

      // ✅ 更新本地狀態（setCurrentMerchant）放這裡，確保真的成功才改
      setCurrentMerchant({
        ...merchant,
        ...payload, // 用 payload 覆蓋更新過的欄位
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* 背景裝飾 */}
      <div className="absolute top-0 left-0 w-full h-32"></div>

      <header className="relative backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 mb-8 p-6">
        {/* 裝飾性漸層邊框 */}
        <div className="absolute inset-0 rounded-2xl -z-10"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
          {/* 左側 Logo 與標題區域 */}
          <div className="flex items-center gap-4">
            {/* 商家 Logo */}
            {merchant?.merchant_logo?.url ? (
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={merchant?.merchant_logo?.url}
                  width={150}
                  height={150}
                  alt={merchant.merchant_logo.filename}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                <MdStorefront size={24} />
              </div>
            )}

            {/* 標題與副標題 */}
            <div className="relative">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                <h1 className="text-md font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent">
                  {merchant ? <>{merchant.business_name}</> : name}
                </h1>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                Online Ordering Platform Management System
              </p>
            </div>
          </div>

          {/* 右側控制區域 */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 狀態指示器 */}
            <button
              className="flex items-center space-x-2"
              onClick={() => handleToggleStatus()}
            >
              <div
                className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  merchant?.is_active
                    ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200"
                    : "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border border-red-200"
                }`}
              >
                <div
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full ${
                    merchant?.is_active
                      ? "bg-emerald-500 animate-pulse"
                      : "bg-red-500"
                  }`}
                ></div>
                <span className="ml-3">
                  {merchant?.is_active ? "In Business" : "At Rest"}
                </span>
              </div>
            </button>

            {/* 商家選擇按鈕 */}
            <Button variant="outline" onClick={handleOpen}>
              <span className="relative z-10">
                {merchant ? merchant.business_name : "Please Create Merchant"}
              </span>
            </Button>

            {/* 主題切換與設定 */}
            <ThemeButton variant={"icon"} />
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
