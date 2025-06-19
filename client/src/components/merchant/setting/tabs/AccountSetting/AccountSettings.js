"use client";
import { useState, useEffect } from "react";
import SettingItem from "@/components/merchant/setting/tabs/AccountSetting/SettingItem";
import Loading from "@/components/common/Loading";
import ErrorMessage from "@/components/common/ErrorMessage";
import useFetch from "@/hooks/api/useFetch";

const AccountSettingPage = ({ userId }) => {
  const [userdata, setUserdata] = useState(null);

  const url = userId
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`
    : null;

  const { data, loading, error, refetch } = useFetch(url, {
    withCredentials: true,
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      setUserdata(data);
    }
  }, [data]);

  if (error)
    return <ErrorMessage errorMessage={error.message} onReload={refetch} />;

  return (
    <div className="container mx-auto p-4 min-h-[400px]">
      {" "}
      {/* 👈 固定容器高度 */}
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      {loading || !userdata ? (
        <div className="flex flex-col gap-3">
          <Loading /> {/* 這邊你可以換成 Skeleton 元件讓體驗更好 */}
        </div>
      ) : (
        <div className="flex flex-col">
          <SettingItem
            label="Name"
            value={userdata.name}
            isEditable={true}
            id={userdata.id}
          />
          <SettingItem
            label="Email"
            value={userdata.email}
            isEditable={true}
            id={userdata.id}
          />
          <SettingItem
            label="Phone Number"
            value={userdata.phoneNumber}
            isEditable={true}
            id={userdata.id}
          />
          <SettingItem
            label="Address"
            value={userdata.address}
            isEditable={true}
            id={userdata.id}
          />
          <SettingItem label="Role" value={userdata.role} isEditable={false} />
          <SettingItem
            label="Created At"
            value={new Date(userdata.createdAt).toLocaleString()}
            isEditable={false}
          />
          <SettingItem
            label="Updated At"
            value={new Date(userdata.updatedAt).toLocaleString()}
            isEditable={false}
          />
        </div>
      )}
    </div>
  );
};

export default AccountSettingPage;
