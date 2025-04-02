"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [userdata, setUserdata] = useState({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/22b67487-5e92-457d-bf13-9178ef4e4baa`,
          { withCredentials: true }
        );
        setUserdata(response.data); // 設置狀態
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {/* Employee Profile Card */}
      <div className="col-span-1 row-span-1 md:row-span-2 md:col-span-3 xl:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6">
        <div className="flex justify-between items-center mb-4 md:mb-5">
          <h2 className="text-base font-semibold dark:text-white">
            User Profile
          </h2>
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
            <i className="fas fa-ellipsis-vertical text-gray-500 dark:text-gray-400"></i>
          </button>
        </div>

        <div className="flex flex-col md:flex-col items-center mb-4 md:mb-6">
          <div className="h-15 w-15 rounded-full bg-gray-200 overflow-hidden mb-2"></div>
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-semibold dark:text-white mb-1">
              {userdata ? userdata?.name : "Name"}
            </h3>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-3 md:mb-4">
              {userdata ? userdata?.role : "Role"}
            </p>
          </div>
        </div>

        <div className="mb-4 md:mb-6 space-y-2">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <span className="text-sm md:text-base">
              Email: {userdata ? userdata?.email : "email"}
            </span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <span className="text-sm md:text-base">
              Joined:{" "}
              {userdata
                ? new Date(userdata.createdAt).toLocaleString()
                : "createdAt"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3">
          {[
            { value: "3", label: "Number of Merchants" },
            { value: "32", label: "Number of Orders" },
            { value: "98%", label: "Review" },
            { value: "$8,450", label: "Monthly incomes" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-2 md:p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-center"
            >
              <div className="text-base md:text-xl font-semibold text-amber-600 dark:text-amber-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
