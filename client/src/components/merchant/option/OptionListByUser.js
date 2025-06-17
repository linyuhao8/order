"use client";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/api/useFetch";
import Loading from "@/components/common/Loading";

const OptionListByUser = ({ userId }) => {
  const url = userId
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/options/all?user_id=${userId}`
    : null;

  const {
    data: optionData,
    loading,
    error,
    refetch,
  } = useFetch(url, {
    withCredentials: true,
    enabled: !!userId,
  });
  if (!userId || !optionData) return null;
  if (loading) return <Loading />;

  const options = optionData.data || null;
  return (
    <>
      {/* 商家表單區塊 */}
      <div className="dark:bg-gray-800 shadow-md overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
            根據User ID獲取單個產品
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            (適用於多個商家都通用的)
          </p>
        </div>

        {/* 顯示選項資料 */}
        <div className="border-t p-5 border-gray-200 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
          {options?.map((option) => (
            <div
              key={option.id}
              className="group relative rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-50 dark:border-gray-700"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  {/* 左側內容 */}
                  <div className="flex-1 space-y-3">
                    {/* 選項名稱 */}
                    <h3 className="text-sm text-gray-600 dark:text-gray-300 font-semibold leading-none tracking-tight group-hover:text-primary transition-colors duration-200">
                      {option.name} ({option.type})
                    </h3>

                    {/* 描述 */}
                    <p className="text-[10px] text-gray-500 text-muted-foreground leading-relaxed">
                      {option.description?.slice(0, 30) || "暫無描述"}
                    </p>

                    {/* 子選項值 */}
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

                    <div className="text-[10px] text-gray-400">{option.id}</div>
                  </div>

                  {/* 價格標籤（若有預設值價格） */}
                  {option.option_values?.some((v) => v.extra_price > 0) && (
                    <div className="flex flex-col items-end gap-3 ml-6">
                      <div className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-[12px] shadow-sm text-white">
                        有加價選項
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 裝飾線 */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* 空狀態 */}
        {options?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4 mb-4">
              <div className="text-4xl">🔘</div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              尚無選項
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm text-center">
              此帳號尚未新增任何選項，請先透過右側或上方功能新增 Option。
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default OptionListByUser;
