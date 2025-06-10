"use client";
//hook
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
//component
import Button from "@/components/common/Button";
import toast from "react-hot-toast";
//icon
import { BsFileEarmarkPost } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { MdStorefront } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const MerchantsCard = ({ merchant, fetchMerchants }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete merchant: ${merchant.business_name}?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/${merchant.id}`,
        { withCredentials: true }
      );
      toast.success("Merchant deleted successfully!");
      // ✅ 判斷是否有傳入 fetchMerchants（來自商家列表頁）
      if (typeof fetchMerchants === "function") {
        fetchMerchants();
      } else {
        // ❌ 沒有 fetchMerchants，可能是從單一商家頁面進來
        router.push("/merchant/dashboard/select");
      }
    } catch (error) {
      console.error("Error deleting merchant:", error);
      toast.error("Failed to delete merchant.");
    }
  };

  return (
    <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <MdStorefront size={24} />
            </div>
            <div>
              <Link
                href={`/merchant/dashboard/${merchant.id}`}
                className="group"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {merchant.business_name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ID: {merchant.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 flex items-center">
              <FiTrendingUp className="mr-1" />
              500 Orders/mo
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <HiLocationMarker className="mt-1 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {merchant.location || "No location specified"}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <BsCalendarDate className="mt-1 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              10-12
            </span>
          </div>
          <div className="flex items-start gap-2">
            <BiCategory className="mt-1 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {merchant.feature || "No features specified"}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <BsInfoCircle className="mt-1 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
              Updated: {new Date(merchant.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <BsInfoCircle className="mt-1 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
              Category: {merchant.categories?.[0]?.name}
            </span>
          </div>
        </div>

        {merchant.description && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {merchant.description}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Last updated: {new Date(merchant.updatedAt).toLocaleDateString()}
          </span>

          <div className="flex gap-2">
            <Button
              variant="square"
              href={`/merchant/dashboard/${merchant.id}`}
            >
              <BsFileEarmarkPost size={18} />
            </Button>
            <Button
              variant="square"
              href={`/merchant/dashboard/${merchant.id}/setting`}
            >
              <IoIosSettings size={18} />
            </Button>
            <Button variant="square" onClick={handleDelete}>
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantsCard;
