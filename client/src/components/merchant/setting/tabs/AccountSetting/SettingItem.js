import React, { useEffect, useState } from "react";
import axios from "axios";
import useModel from "@/hooks/ui/useModel";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import toast from "react-hot-toast";
import SettingSubModal from "./SettingSubModal";

const ProfileItem = ({ label, value, isEditable, id }) => {
  const [isSubModalOpen, openSubModal, closeSubModal] = useModel();
  const [inputValue, setInputValue] = useState(value);
  const [updateValue, setUpdateValue] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUpdate(true);
    const data = {};
    if (label === "Name" && inputValue.trim()) data.name = inputValue;
    if (label === "Phone Number" && inputValue.trim())
      data.phoneNumber = inputValue;
    if (label === "Address" && inputValue.trim()) data.address = inputValue;
    if (label === "Email" && inputValue.trim()) data.email = inputValue;

    if (Object.keys(data).length === 0) {
      toast.error("Enter Value！");
      setIsUpdate(false);
      return;
    }

    try {
      toast.loading("Update...");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        data,
        { withCredentials: true }
      );
      const responseData = response.data;
      toast.dismiss();
      toast.success("Update successfully!", responseData);
      console.log("Update success:", responseData);
      setUpdateValue(inputValue);
    } catch (error) {
      toast.dismiss();

      const errorData = error.response?.data;

      toast.error(
        Array.isArray(errorData?.errors) && errorData.errors.length > 0
          ? errorData.errors.join("\n")
          : errorData?.message ||
              error.message ||
              "Update failed, please try again later"
      );

      console.error("Update failed:", errorData || error.message);
    } finally {
      setIsUpdate(false);
    }
  };

  return (
    <>
      <div className="profile-item">
        <label className="profile-label w-[40%]">{label}</label>
        <div className="profile-value w-[60%] min-h-12">
          {updateValue ? updateValue : value}
        </div>
        {isEditable && (
          <div className="edit-btn-container">
            <button className="edit-btn" onClick={openSubModal}>
              Modify
            </button>
          </div>
        )}
      </div>
      <SettingSubModal
        isOpen={isSubModalOpen}
        closeModal={closeSubModal}
        label={label}
        value={value}
        inputValue={inputValue}
        handleSubmit={handleSubmit}
        isUpdate={isUpdate}
        setInputValue={setInputValue}
      />
    </>
  );
};

export default ProfileItem;
