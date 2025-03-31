import { useState, useEffect } from "react";
import axios from "axios";
import SettingItem from "@/components/merchant/setting/tabs/AccountSetting/SettingItem";

const ProfilePage = () => {
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
    <div className="container mx-auto p-4">
      {userdata ? (
        <div className="">
          <h1 className="text-2xl font-semibold mb-4">Profile</h1>

          {/* 使用 ProfileItem 元件來顯示資料 */}
          <div className="flex flex-col gap-3">
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
            <SettingItem
              label="Role"
              value={userdata.role}
              isEditable={false}
            />
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
