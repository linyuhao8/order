"use client";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/api/useFetch";
import Loading from "@/components/common/Loading";

const OptionListByMerchant = ({ user }) => {
  const [activeMerchant, setActiveMerchant] = useState(null);
  const [merchantOptionsUrl, setMerchantOptionsUrl] = useState(null);

  // 取得該使用者擁有的商家清單
  const merchantUrl = user
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/user/${user.id}/merchants`
    : null;

  const {
    data: merchantData,
    loading: merchantLoading,
    error: merchantError,
  } = useFetch(merchantUrl, {
    withCredentials: true,
    enabled: !!user,
  });

  // 根據 activeMerchant 動態生成 option API URL
  useEffect(() => {
    if (activeMerchant) {
      setMerchantOptionsUrl(
        `${process.env.NEXT_PUBLIC_API_URL}/api/options/all?merchant_id=${activeMerchant}`
      );
    }
  }, [activeMerchant]);

  const {
    data: optionData,
    loading: optionLoading,
    error: optionError,
    refetch: optionRefetch,
  } = useFetch(merchantOptionsUrl, {
    withCredentials: true,
    enabled: !!merchantOptionsUrl,
  });

  const merchants = merchantData || [];
  const options = optionData?.data || [];
  useEffect(() => {
    if (merchantData) {
      console.log(merchantData);
    }
  }, [merchantData]);

  if (merchantLoading) return <Loading />;

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
      {optionLoading ? (
        <Loading />
      ) : (
        activeMerchant && (
          <>
            <div className="border-t p-5 border-gray-200 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
              {options.map((option) => (
                <div
                  key={option.id}
                  className="group relative rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-50 dark:border-gray-700"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <h3 className="text-sm text-gray-600 dark:text-gray-300 font-semibold leading-none tracking-tight group-hover:text-primary transition-colors duration-200">
                          {option.name} ({option.type})
                        </h3>

                        <p className="text-[10px] text-gray-500 text-muted-foreground leading-relaxed">
                          {option.description?.slice(0, 30) || "暫無描述"}
                        </p>

                        <ul className="list-disc pl-4 space-y-1 text-[12px] text-gray-700 dark:text-gray-300">
                          {option.option_values?.length > 0 ? (
                            option.option_values.map((value) => (
                              <li key={value.id}>
                                {value.values}
                                {value.extra_price > 0 &&
                                  `（+${value.extra_price}元）`}
                                {value.is_default && " ⭐"}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-400">無選項值</li>
                          )}
                        </ul>

                        <div className="text-[10px] text-gray-400">
                          {option.id}
                        </div>
                      </div>

                      {option.option_values?.some((v) => v.extra_price > 0) && (
                        <div className="flex flex-col items-end gap-3 ml-6">
                          <div className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-[12px] shadow-sm text-white">
                            有加價選項
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            {options.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <div className="text-4xl">🔘</div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  尚無選項
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm text-center">
                  此商家尚未新增任何選項，請先透過右側或上方功能新增 Option。
                </p>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default OptionListByMerchant;
