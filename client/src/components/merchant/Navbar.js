"use client";
import Link from "next/link";

//logout hook
import { useLogout } from "@/hooks/auth/useLogout";

//icon
import { IoHome } from "react-icons/io5"; //Home
import { FaUser } from "react-icons/fa"; //User
import { MdDashboard } from "react-icons/md"; // Dashboard
import { FaStore } from "react-icons/fa"; // Merchants
import { MdRestaurantMenu } from "react-icons/md"; // Menu
import { FaShoppingCart } from "react-icons/fa"; // Order
import { MdRateReview } from "react-icons/md"; // Review

const Navbar = () => {
  const { logout } = useLogout();
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
                icon: <IoHome size={24} />,
                label: "Home",
                url: `${process.env.NEXT_PUBLIC_URL}`,
              },
              {
                icon: <FaUser size={24} />,
                label: "Profile",
                url: `${process.env.NEXT_PUBLIC_URL}/dashboard/user/profile`,
              },
              {
                icon: <MdDashboard size={24} />,
                label: "Dashboard",
                url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
              },
              { icon: <FaStore size={24} />, label: "Merchants" },
              { icon: <MdRestaurantMenu size={24} />, label: "Menu" },
              { icon: <FaShoppingCart size={24} />, label: "Order" },
              { icon: <MdRateReview size={24} />, label: "Review" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url ? `${item.url}` : "#"}
                  className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <button onClick={logout}>logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
