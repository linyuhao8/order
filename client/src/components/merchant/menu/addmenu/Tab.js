"use client";

import { useState, useEffect } from "react";

//component
import Button from "@/components/common/Button";
import MenuTab from "./MenuTab";
import ProductTab from "../../product/ProductTab";
import Loading from "@/components/common/Loading";

const Tab = ({ active, merchantId }) => {
  const [activeTab, setActiveTab] = useState(active || "menu");
  if ((!active, !merchantId)) return <Loading />;
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
            <option value="menu">Menu</option>
            <option value="product">Product</option>
          </select>
        </div>

        {/* 電腦版Tab */}
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
              <Button
                onClick={() => setActiveTab("menu")}
                variant={activeTab === "menu" ? "activeTab" : "tab"}
              >
                Menu
              </Button>
              <Button
                onClick={() => setActiveTab("product")}
                variant={activeTab === "product" ? "activeTab" : "tab"}
              >
                Product
              </Button>
            </nav>
          </div>
        </div>
      </div>
      {activeTab === "menu" && (
        <MenuTab activeTab={activeTab} merchantId={merchantId} />
      )}
      {activeTab === "product" && (
        <ProductTab activeTab={activeTab} merchantId={merchantId} />
      )}
    </>
  );
};

export default Tab;
