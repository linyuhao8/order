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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
      {options.map((option) => (
        <div
          key={option.id}
          className="h-full group relative rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-50 dark:border-gray-700"
        >
          <div className="p-5">
            <div className="flex items-start justify-between">
              {/* left content */}
              <div className="flex-1 space-y-3">
                {/* option name */}
                <h3 className="text-sm text-gray-600 dark:text-gray-300 font-semibold leading-none tracking-tight group-hover:text-primary transition-colors duration-200">
                  {option.name} ({option.type})
                </h3>

                {/* description */}
                <p className="text-[10px] text-gray-500 text-muted-foreground leading-relaxed">
                  {option.description?.slice(0, 30) || "not thing"}
                </p>

                {/* Price labels (if there are preset prices) */}
                {option.option_values?.some((v) => v.extra_price > 0) && (
                  <div className="inline-flex text-[12px] bg-gray-600 text-white px-3 py-1 rounded-sm">
                    Price increase options available
                  </div>
                )}

                {/* Sub-Option Value */}
                <ul className="list-disc pl-4 space-y-1 text-[12px] text-gray-700 dark:text-gray-300">
                  {option.option_values?.length > 0 ? (
                    option.option_values
                      .slice()
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((value) => (
                        <li key={value.id}>
                          {value.value}
                          {value.extra_price > 0 &&
                            `（+${value.extra_price} TWD）`}
                          <span className="text-[10px]">
                            {value.is_default && " default"}
                          </span>
                        </li>
                      ))
                  ) : (
                    <li className="text-gray-400">No option value</li>
                  )}
                </ul>

                <div className="text-[10px] text-gray-400">{option.id}</div>
                {canUnbind ? (
                  <Button
                    variant="outline"
                    onClick={() => deleteProductOption(option._productOptionId)}
                  >
                    結除綁定此商品
                  </Button>
                ) : null}
              </div>

              {/* Delete */}
              <div className="flex flex-col items-end gap-2">
                <Button
                  variant="square"
                  onClick={() => handleDelete(option.id, option.name)}
                >
                  <MdDelete />
                </Button>
              </div>
            </div>
          </div>

          {/* 裝飾線 */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
};

export default OptionGrid;
