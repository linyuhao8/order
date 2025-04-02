"use client";
import Link from "next/link";

//component
import Button from "@/components/common/Button";
import LogoutButton from "@/components/common/auth/LogoutButton";

//icon
import { IoHome } from "react-icons/io5"; //Home
import { FaUser } from "react-icons/fa"; //User
import { MdDashboard } from "react-icons/md"; // Dashboard
import { FaStore } from "react-icons/fa"; // Merchants
import { MdRestaurantMenu } from "react-icons/md"; // Menu
import { FaShoppingCart } from "react-icons/fa"; // Order
import { MdRateReview } from "react-icons/md"; // Review

const Navbar = () => {
  return (
    <div>
      {/* Sidebar - Mobile Menu, Desktop Fixed */}
      <div className="block md:w-64 md:fixed h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 z-10">
        <Link href="/">
          <div className="flex items-center flex-nowrap space-x-2 mb-6">
            <div className="bg-amber-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
              <span>H</span>
            </div>
            <div>
              <span className="font-medium">Hank Order</span>
            </div>
          </div>
        </Link>

        <nav className="dashboard-nav">
          <ul className="space-y-2">
            {[
              {
                icon: IoHome,
                label: "Home",
                url: process.env.NEXT_PUBLIC_URL || "/",
              },
              {
                icon: FaUser,
                label: "Profile",
                url: `${process.env.NEXT_PUBLIC_URL}/merchant/dashboard/profile`,
              },
              {
                icon: MdDashboard,
                label: "Dashboard",
                url: `${process.env.NEXT_PUBLIC_URL}/merchant/dashboard`,
              },
              {
                icon: FaStore,
                label: "Merchants",
                url: `${process.env.NEXT_PUBLIC_URL}/merchant/dashboard/select`,
              },
              {
                icon: MdRestaurantMenu,
                label: "Menu",
                url: "/menu",
              },
              {
                icon: FaShoppingCart,
                label: "Order",
                url: "/order",
              },
              {
                icon: MdRateReview,
                label: "Review",
                url: "/review",
              },
            ].map((item, index) => (
              <li key={index}>
                <Button
                  icon={item.icon}
                  href={item.url}
                  variant="dashboardNav"
                  size="md"
                >
                  {item.label}
                </Button>
              </li>
            ))}
            <li>
              <LogoutButton variant="dashboardNav" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
