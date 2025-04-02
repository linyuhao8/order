"use client";
// icon
import { IoIosSettings } from "react-icons/io";

//model
import { Modal } from "@/components/common/Model";
import useModel from "@/hooks/ui/useModel";

//component
import SettingPage from "@/app/merchant/dashboard/settings/page";

const SettingButton = () => {
  const [isModalOpen, openModal, closeModal] = useModel();
  return (
    <>
      <button onClick={openModal}>
        <IoIosSettings className="text-2xl" />
      </button>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <SettingPage settingActiveTab="account" />
      </Modal>
    </>
  );
};

export default SettingButton;
