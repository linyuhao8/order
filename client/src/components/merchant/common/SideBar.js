"use client";
import React, { useState } from "react";
import Link from "next/link";
// React Icons
import { IoMenu, IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { MdOutlinePermMedia } from "react-icons/md";
import { BsShopWindow } from "react-icons/bs";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Button from "@/components/common/Button";
import LogoutButton from "@/components/common/auth/LogoutButton";
import ThemeButton from "@/components/common/ui/ThemeButton";
import { useMerchant } from "@/hooks/useMerchant";
import { useHasMounted } from "@/hooks/useHasMounted";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const hasMounted = useHasMounted();

  const { merchant, _setCurrentMerchant, _clearCurrentMerchant } =
    useMerchant();
  if (!hasMounted) return null;
  const userItems = [
    {
      icon: MdOutlinePermMedia,
      label: "Media",
      url: "/merchant/dashboard/media",
    },
    {
      icon: FaUser,
      label: "User",
      url: "/merchant/dashboard/profile",
    },
  ].filter(Boolean); // 過濾掉 false/null

  const merchantItems = [
    merchant && {
      icon: MdRestaurantMenu,
      label: "Product / Menu Management",
      url: `/merchant/dashboard/${merchant.id}`,
    },
    {
      icon: FaShoppingCart,
      label: "Order Management",
      url: "/order",
      badge: "Not yet",
    },
    {
      icon: MdRateReview,
      label: "Review Management",
      url: "/review",
      badge: "Not yet",
    },
  ].filter(Boolean); // Filter out false/null

  const addMenuItems = [
    {
      icon: BsShopWindow,
      label: "Add Merchant or Category",
      url: "/merchant/dashboard/add-merchant",
    },
    merchant && {
      icon: MdRestaurantMenu,
      label: "Add Menu or Product",
      url: `/merchant/dashboard/${merchant.id}/add-menu`,
    },
  ].filter(Boolean); // Filter out false/null

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
      >
        {isOpen ? (
          <IoClose className="h-5 w-5" />
        ) : (
          <IoMenu className="h-5 w-5" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${isCollapsed ? "md:w-20" : "md:w-64"}
        w-64 shadow-xl md:shadow-none
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <Link
              href="/merchant/dashboard"
              className={`flex items-center gap-3 ${
                isCollapsed ? "md:justify-center" : ""
              }`}
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl h-10 w-10 flex items-center justify-center font-bold text-lg shadow-lg">
                H
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Dashboard
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Merchant
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Collapse Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
            >
              {isCollapsed ? (
                <MdChevronRight className="h-4 w-4" />
              ) : (
                <MdChevronLeft className="h-4 w-4" />
              )}
            </button>
          </div>
          {/* Navigation */}

          {renderMenuSection(merchantItems, "Merchant", isCollapsed)}
          {renderMenuSection(addMenuItems, "Create", isCollapsed)}
          {renderMenuSection(userItems, "Main", isCollapsed, true)}

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-2">
            {/* Theme Toggle */}
            <ThemeButton
              variant={isCollapsed ? "icon " : "dashboardNav"}
              text={isCollapsed ? false : true}
            />

            {/* Logout */}
            <div className="relative group">
              <LogoutButton variant="dashboardNav" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Spacer for Desktop */}
      <div
        className={`hidden md:block transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      />
    </>
  );
};

export default SideBar;

// 在 component function 裡面（SideBar）
const renderMenuSection = (items, title = "主要功能", isCollapsed, flex) => (
  <nav className={`${flex ? "flex-1" : "null"} p-4 space-y-2`}>
    <div className={`mb-6 ${isCollapsed ? "md:hidden" : ""}`}>
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        {title}
      </h3>
    </div>

    {items.map((item, index) => (
      <div key={index} className="relative group">
        <Button icon={item.icon} href={item.url} variant="dashboardNav">
          <span className={isCollapsed ? "md:hidden" : ""}>{item.label}</span>
          {item.badge && !isCollapsed && (
            <span className="ml-auto px-2 py-0.5 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-full text-nowrap">
              {item.badge}
            </span>
          )}
        </Button>

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 top-1/2 -translate-y-1/2">
            {item.label}
          </div>
        )}
      </div>
    ))}
  </nav>
);
