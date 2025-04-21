"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";

import axios from "axios";
import toast from "react-hot-toast";

//component
import CategoryTab from "./CategoryTab";
import MerchantTab from "./MerchantTab";
import Button from "@/components/common/Button";

const Tab = ({active}) => {
  const [activeTab, setActiveTab] = useState(active);
  const [categories, setCategories] = useState([]);
  const user = useUser();

  const userId = user.id;

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/merchant-categorys/`,
        { withCredentials: true }
      );
      if (response.status === 200 && response.data?.data) {
        setCategories(response.data.data);
      } else {
        toast.error("無法取得分類資料，請稍後再試");
        setCategories([]);
      }
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
      toast.error("獲取分類時發生錯誤");
      setError(err);
      setCategories([]);
    }
  };

  useEffect(() => {
    if (user) {
      getAllCategories();
    }
  }, [user]);

  return (
    <>
      {/* 選項卡切換 */}
      <div className="mb-8">
        {/* 手機版Tab */}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            選擇一個標籤
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option
              value="merchant"
              className="text-black bg-white dark:text-white dark:bg-gray-800"
            >
              新增商家
            </option>
            <option
              value="category"
              className="text-black bg-white dark:text-white dark:bg-gray-800"
            >
              新增分類
            </option>
          </select>
        </div>

        {/* 電腦版Tab */}
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
              <Button
                onClick={() => setActiveTab("merchant")}
                variant={activeTab === "merchant" ? "activeTab" : "tab"}
              >
                新增商家
              </Button>
              <Button
                onClick={() => setActiveTab("category")}
                variant={activeTab === "category" ? "activeTab" : "tab"}
              >
                新增分類
              </Button>
            </nav>
          </div>
        </div>
      </div>

      <MerchantTab
        activeTab={activeTab}
        categories={categories}
        userId={userId}
      />
      <CategoryTab
        activeTab={activeTab}
        categories={categories}
        getAllCategories={getAllCategories}
        userId={userId}
      />
    </>
  );
};

export default Tab;
