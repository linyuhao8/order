"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import InputField from "@/components/common/InputField";
import { Package, User, Building } from "lucide-react";
import { useMerchant } from "@/hooks/useMerchant";
import Button from "@/components/common/Button";

const BindProductOption = ({
  filterType: defaultFilterType = "user_id",
  user,
  productId,
  getOptionByProductIdrefetch,
}) => {
  const [filterType, setFilterType] = useState(defaultFilterType);
  const [filterValue, setFilterValue] = useState(user.id);
  const [options, setOptions] = useState([]);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [required, setRequired] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const { merchant } = useMerchant();
  // 取得 options 清單
  useEffect(() => {
    if (!filterValue) return;
    const fetchOptions = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/options/all?${filterType}=${filterValue}`;
        const res = await axios.get(url, { withCredentials: true });
        setOptions(res.data.data || []);
      } catch (err) {
        console.log(err);
        toast.error("取得 options 失敗");
      }
    };
    fetchOptions();
  }, [filterType, filterValue]);

  const handleSubmit = async () => {
    if (!productId) {
      toast.error("請提供 productId");
      return;
    }
    if (!selectedOptionId) {
      toast.error("請選擇 Option");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product-options/create`,
        {
          product_id: productId,
          option_id: selectedOptionId,
          required,
          sort_order: isNaN(Number(sortOrder)) ? null : Number(sortOrder),
        },
        { withCredentials: true }
      );
      toast.success("綁定成功");
      //刷新資料
      if (getOptionByProductIdrefetch) {
        getOptionByProductIdrefetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("綁定失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800  transition-colors duration-300">
      <div className="container">
        <div className="mx-auto">
          <div>
            <div className="flex flex-col gap-5">
              <div className="space-y-6">
                {/* 篩選類型 - Radio */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    篩選類型
                  </label>
                  <InputField
                    id="filter_user"
                    name="filterType"
                    type="radio"
                    value="user_id"
                    checked={filterType === "user_id"}
                    onChange={() => {
                      setFilterType("user_id");
                      setFilterValue(user.id);
                      setSelectedOptionId("");
                    }}
                    label="依 user_id"
                    icon={User}
                  />
                  <InputField
                    id="filter_merchant"
                    name="filterType"
                    type="radio"
                    value="merchant_id"
                    checked={filterType === "merchant_id"}
                    onChange={() => {
                      setFilterType("merchant_id");
                      setFilterValue(merchant?.id ?? "");
                      setSelectedOptionId("");
                    }}
                    label="依 merchant_id"
                    icon={Building}
                  />
                </div>

                {/* 選擇選項 - Select */}
                <InputField
                  id="option"
                  name="option"
                  type="select"
                  value={selectedOptionId}
                  onChange={(e) => setSelectedOptionId(e.target.value)}
                  label="選擇選項"
                  selectPlaceholder="-- 請選擇 Option --"
                  options={options.map((opt) => ({
                    id: opt.id,
                    name: `${opt.name} (${opt.type})`,
                  }))}
                />

                {/* 是否必選 - Checkbox */}
                <InputField
                  id="required"
                  name="required"
                  type="checkbox"
                  checked={required}
                  onChange={(e) => setRequired(e.target.checked)}
                  label="是否必選"
                  icon={Package}
                />

                {/* 排序 - 數字輸入 */}
                <InputField
                  id="sortOrder"
                  name="sortOrder"
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  label="排序 (sort_order)"
                  placeholder="請輸入數字"
                />
              </div>
              {/* Submit Button */}
              <Button
                variant="full"
                onClick={handleSubmit}
                disabled={loading}
                disabledText="Loading"
              >
                綁定
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BindProductOption;
