"use client";
import { FaRegUser } from "react-icons/fa";
import useFetch from "@/hooks/api/useFetch";
import Loading from "@/components/common/Loading";
import ErrorMessage from "@/components/common/ErrorMessage";

const UserProfile = ({ user }) => {
  const userId = user?.id;
  const url = userId
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`
    : null;

  const {
    data: userdata,
    loading,
    error,
    refetch,
  } = useFetch(url, {
    withCredentials: true,
    enabled: !!userId,
  });

  if (!userId) return null;
  if (loading) return <Loading />;
  if (error)
    return <ErrorMessage errorMessage={error.message} onReload={refetch} />;

  const {
    id = "ID",
    name = "Name",
    email = "Email",
    role = "Role",
    createdAt,
  } = userdata || {};

  const stats = [
    { value: "3", label: "Number of Merchants" },
    { value: "32", label: "Number of Orders" },
    { value: "98%", label: "Review" },
    { value: "$8,450", label: "Monthly incomes" },
  ];

  return (
    <div className="col-span-1 row-span-1 md:row-span-2 md:col-span-3 xl:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6 border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 md:mb-5">
        <h2 className="text-base font-semibold dark:text-white">
          User Profile
        </h2>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="h-15 w-15 flex justify-center items-center rounded-full bg-gray-200 dark:bg-gray-700 mb-2">
          <FaRegUser size={25} />
        </div>
        <div className="text-center">
          <h3 className="text-lg md:text-xl font-semibold dark:text-white mb-1">
            {name}
          </h3>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
            {role}
          </p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mb-6 space-y-2 text-sm md:text-base text-gray-500 dark:text-gray-400">
        <p>ID: {id}</p>
        <p>Email: {email}</p>
        <p>
          Joined: {createdAt ? new Date(createdAt).toLocaleString() : "Unknown"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ value, label }, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-center"
          >
            <div className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-1">
              {value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
