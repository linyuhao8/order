import Link from "next/link";
import { BsFileEarmarkPost } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { MdStorefront } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";

const MerchantsCard = ({ merchant }) => {
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
            <Link
              href={`/merchant/dashboard/${merchant.id}`}
              className="flex justify-center items-center h-9 w-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-600 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-amber-900/30 dark:hover:text-amber-400"
            >
              <BsFileEarmarkPost size={18} />
            </Link>
            <Link
              href={`/merchant/dashboard/${merchant.id}/setting`}
              className="flex justify-center items-center h-9 w-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-600 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-amber-900/30 dark:hover:text-amber-400"
            >
              <IoIosSettings size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantsCard;
