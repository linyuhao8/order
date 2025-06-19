"use client";
import { useState, useEffect, useMemo } from "react";
import useFetch from "@/hooks/api/useFetch";
import Loading from "@/components/common/Loading";
import OptionGrid from "./OptionGrid";

const OptionListByMerchant = ({
  merchantData,
  merchantLoading,
  refreshKey,
}) => {
  const [activeMerchant, setActiveMerchant] = useState(null);
  //固定資料
  const merchants = useMemo(() => merchantData || [], [merchantData]);
  const merchantOptionsUrl = activeMerchant
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/options/all?merchant_id=${activeMerchant}`
    : null;

  useEffect(() => {
    if (merchants.length > 0 && !activeMerchant) {
      setActiveMerchant(merchants[0].id);
    }
  }, [merchants, activeMerchant]);

  const {
    data: optionData,
    loading: optionLoading,
    error: optionError,
    refetch: optionRefetch,
  } = useFetch(merchantOptionsUrl, {
    withCredentials: true,
    enabled: !!merchantOptionsUrl,
  });
  useEffect(() => {
    console.log(refreshKey);
    if (!activeMerchant) return;
    optionRefetch();
  }, [refreshKey, activeMerchant, optionRefetch]);

  const options = optionData?.data || [];

  if (merchantLoading || optionLoading) return <Loading />;

  return (
    <div className="dark:bg-gray-800 shadow-md overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
          根據商家 ID 獲取選項
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          請先選擇商家
        </p>
      </div>
      {/* 商家選擇 */}
      <div className="px-5 pb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          選擇商家
        </label>
        <select
          value={activeMerchant || ""}
          onChange={(e) => setActiveMerchant(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
          <option value="" disabled>
            請選擇一個商家
          </option>
          {merchants?.map((merchant) => (
            <option key={merchant.id} value={merchant.id}>
              {merchant.business_name}
            </option>
          ))}
        </select>
      </div>

      {/* 顯示選項資料 */}
      {activeMerchant && (
        <>
          <OptionGrid
            options={options}
            getOptionByMerchantRefetch={optionRefetch}
          />
        </>
      )}
    </div>
  );
};

export default OptionListByMerchant;
