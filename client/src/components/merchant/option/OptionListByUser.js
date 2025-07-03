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
        <div className="px-4 py-3 sm:px-6 border-b border-gray-200">
          <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
            Get a single product based on User ID.
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Applicable to multiple merchants
          </p>
        </div>
        <div className="p-5">
          <OptionGrid
            options={options}
            getOptionByUserRefetch={getOptionByUserRefetch}
          />
        </div>
      </div>
    </>
  );
};

export default OptionListByUser;
