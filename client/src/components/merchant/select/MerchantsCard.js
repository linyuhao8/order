import Link from "next/link";
import { BsFileEarmarkPost } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";

const MerchantsCard = ({ merchant }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-600">
      <div className="flex justify-between items-center px-5 py-6">
        <div className="left">
          <Link href={`${process.env.NEXT_PUBLIC_URL}/merchant/dashboard/id`}>
            <h3 className="text-lg text-gray-800">{merchant.business_name}</h3>
          </Link>
          <p className="text-sm text-gray-600">Time:10-12</p>
          <p className="text-sm text-gray-600">Location:{merchant.location}</p>
          <p className="text-sm text-gray-600">
            Description:{merchant.description}
          </p>
          <p className="text-sm text-gray-600">Feature: {merchant.feature}</p>
          <p className="text-sm text-gray-600">
            Updated: {new Date(merchant.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="right flex flex-col items-end  h-full min-h-[120px]  justify-between">
          <span className="text-sm">Monthly Orders:500</span>
          <div className="flex nowrap gap-2">
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/merchant/dashboard/id`}
              className="flex justify-center items-center h-7 w-7 rounded-full bg-gray-300 overflow-hidden"
            >
              <BsFileEarmarkPost />
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/merchant/dashboard/id/setting`}
              className="flex justify-center items-center h-7 w-7 rounded-full bg-gray-300 overflow-hidden"
            >
              <IoIosSettings />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantsCard;
