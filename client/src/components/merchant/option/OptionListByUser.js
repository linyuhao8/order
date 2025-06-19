"use client";
import Loading from "@/components/common/Loading";
import OptionGrid from "./OptionGrid";

const OptionListByUser = ({
  optionData,
  optionLoading,
  getOptionByUserRefetch,
}) => {
  if (!optionData) return null;
  if (optionLoading) return <Loading />;

  const options = optionData.data || [];
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

        <OptionGrid
          options={options}
          getOptionByUserRefetch={getOptionByUserRefetch}
        />
      </div>
    </>
  );
};

export default OptionListByUser;
