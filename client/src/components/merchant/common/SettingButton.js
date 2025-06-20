"use client";
// icon
import { IoIosSettings } from "react-icons/io";

//modal
import { Modal } from "@/components/common/Modal";
import useModal from "@/hooks/ui/useModal";

//component
import Setting from "@/components/merchant/setting/Setting";

const SettingButton = ({ user }) => {
  const [isModalOpen, openModal, closeModal] = useModal();
  return (
    <>
      <button onClick={openModal}>
        <IoIosSettings className="text-2xl" />
      </button>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <Setting settingActiveTab={"account"} user={user} />
      </Modal>
    </>
  );
};

export default SettingButton;
