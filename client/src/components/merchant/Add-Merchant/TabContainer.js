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
import ResponsiveTabs from "@/components/common/ResponsiveTabs";

const TabContainer = () => {
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

  // 可以直接用
  const categories = data?.data || [];

  if (loading) return <Loading />;
  if (error)
    return <ErrorMessage errorMessage={error.message} onReload={refetch} />;
  if (!categories) return null;

  return (
    <>
      <ResponsiveTabs
        tabs={[
          { label: "Add Merchant", value: "merchant" },
          { label: "Add Category", value: "category" },
        ]}
        defaultValue="merchant"
        renderContent={(activeTab) => {
          if (activeTab === "merchant") {
            return (
              <MerchantTab
                activeTab={activeTab}
                categories={categories}
                userId={userId}
              />
            );
          } else if (activeTab === "category") {
            return (
              <CategoryTab
                activeTab={activeTab}
                categories={categories}
                getAllCategories={refetch}
                userId={userId}
              />
            );
          }
          return null;
        }}
      />
    </>
  );
};

export default TabContainer;
