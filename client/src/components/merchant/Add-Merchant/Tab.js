"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import useFetch from "@/hooks/api/useFetch";

//component
import CategoryTab from "./CategoryTab";
import MerchantTab from "./MerchantTab";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import ErrorMessage from "@/components/common/ErrorMessage";

const Tab = ({ active }) => {
  const [activeTab, setActiveTab] = useState(active || "merchant");
  const [categories, setCategories] = useState([]);

  //custom context
  const user = useUser();

  const userId = user ? user.id : null;

  const url = userId
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/merchant-categorys/`
    : null;

  const { data, loading, error, refetch } = useFetch(url, {
    withCredentials: true,
    enabled: !!userId,
  });
  useEffect(() => {
    if (data) {
      setCategories(data.data);
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error)
    return <ErrorMessage errorMessage={error.message} onReload={refetch} />;
  if (!categories) return null;

  return (
    <>
      {/* 選項卡切換 */}
      <div className="mb-8">
        {/* 手機版Tab */}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            choose one
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="merchant">Merchant</option>
            <option value="category">Category</option>
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
                Merchant
              </Button>
              <Button
                onClick={() => setActiveTab("category")}
                variant={activeTab === "category" ? "activeTab" : "tab"}
              >
                Category
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {activeTab === "merchant" && (
        <MerchantTab
          activeTab={activeTab}
          categories={categories}
          userId={userId}
        />
      )}

      {activeTab === "category" && (
        <CategoryTab
          activeTab={activeTab}
          categories={categories}
          getAllCategories={refetch}
          userId={userId}
        />
      )}
    </>
  );
};

export default Tab;
