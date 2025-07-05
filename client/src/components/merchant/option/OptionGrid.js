"use client";
import Button from "@/components/common/Button";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const OptionGrid = ({
  options = [],
  getOptionByMerchantRefetch,
  getOptionByUserRefetch,
  canUnbind = false,
  getOptionByProductIdrefetch,
}) => {
  if (!options || options.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="rounded-full bg-muted p-4 mb-4">
          <div className="text-4xl">🔘</div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No option yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm text-center">
          This merchant has not added any product options yet, so please add an
          Option using the button above.
        </p>
      </div>
    );
  }

  //刪除option
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete merchant: ${name}?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/options/${id}`,
        { withCredentials: true }
      );
      toast.success("deleted successfully!");
      //重新抓資料
      if (getOptionByMerchantRefetch) {
        getOptionByMerchantRefetch();
      }
      if (getOptionByUserRefetch) {
        getOptionByUserRefetch();
      }
      if (getOptionByProductIdrefetch) {
        getOptionByProductIdrefetch();
      }
    } catch (error) {
      console.error("Error deleting", error);
      toast.error("Failed to delete");
    }
  };

  //解除綁定商品中間表
  const deleteProductOption = async (id) => {
    try {
      toast.loading("結除綁定中...");
      const response = await axios.delete(
        `http://localhost:8082/api/product-options/${id}`,
        { withCredentials: true }
      );
      toast.dismiss();
      toast.success("解除成功");
      if (getOptionByProductIdrefetch) {
        getOptionByProductIdrefetch();
      }
      return response.data;
    } catch (error) {
      toast.dismiss();
      toast.error("解除失敗");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
      {options.map((option) => (
        <div
          key={option.id}
          className="group relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900  hover:shadow-md transition-all"
        >
          <div className="p-5 space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex-1 space-y-1">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition">
                  {option.name} ({option.type})
                </h3>

                {/* Description */}
                {option.description ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {option.description.slice(0, 30)}
                  </p>
                ) : (
                  <p className="text-[12px] text-gray-400">No description</p>
                )}
              </div>

              {/* Delete Button */}
              <Button
                variant="square"
                onClick={() => handleDelete(option.id, option.name)}
              >
                <MdDelete />
              </Button>
            </div>

            {/* Attributes */}
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1 h-1 rounded-full ${
                      option.required ? "bg-red-500" : "bg-orange-400"
                    }`}
                  />
                  <span
                    className={
                      option.required ? "text-red-600" : "text-gray-500"
                    }
                  >
                    {option.required ? "required" : "no required"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full" />
                  sort: {option._sort_order}
                </div>
              </div>

              <div className="flex flex-row gap-2">
                <span>max select: {option.max_select}</span>
                <span>max select: {option.min_select}</span>
              </div>
            </div>

            {/* Extra Price Indicator */}
            {option.option_values?.some((v) => v.extra_price > 0) && (
              <div className="inline-block text-xs bg-yellow-500 text-white px-2 py-1 rounded">
                Price Increase Options
              </div>
            )}

            {/* Option Values */}
            <div className="flex flex-wrap gap-2 text-sm text-gray-700 dark:text-gray-200">
              {option.option_values?.length > 0 ? (
                option.option_values
                  .slice()
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((value) => (
                    <div
                      key={value.id}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-sm border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-xs"
                    >
                      <span>{value.value}</span>

                      {value.extra_price > 0 && (
                        <span className="text-yellow-600 dark:text-yellow-400">
                          +{value.extra_price} TWD
                        </span>
                      )}

                      {value.is_default && (
                        <span className="text-primary text-[10px]">
                          default
                        </span>
                      )}

                      {value.sort_order !== undefined && (
                        <span className="text-[10px] text-gray-400">
                          sort: {value.sort_order}
                        </span>
                      )}
                    </div>
                  ))
              ) : (
                <div className="text-gray-400 text-xs">No option value yet</div>
              )}
            </div>

            {/* ID + Unbind */}
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-400">ID: {option.id}</span>
            </div>
            {canUnbind && (
              <Button
                variant="outline"
                className="text-xs px-2 py-1"
                onClick={() => deleteProductOption(option._productOptionId)}
              >
                Unbinding
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptionGrid;
