"use client";
// icon
import { IoIosSettings } from "react-icons/io";

//model
import { Modal, SubModal } from "@/components/common/Model";
import useModel from "@/hooks/ui/useModel";

//component
import SettingPage from "@/components/merchant/setting/SettingPage";

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
