//icon
import { IoIosSettings } from "react-icons/io";

//model
import { Modal, SubModal } from "@/components/common/Model";
import useModel from "@/hooks/ui/useModel";

//component
import SettingPage from "@/components/merchant/setting/SettingPage";

const SettingButton = () => {
  const [isModalOpen, openModal, closeModal] = useModel();
  const [isSubModalOpen, openSubModal, closeSubModal] = useModel();
  return (
    <>
      <button onClick={openModal}>
        <IoIosSettings className="text-2xl" />

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <SettingPage />
        <button onClick={openSubModal}>Open SubModal</button>
      </Modal>

      <SubModal isOpen={isSubModalOpen} closeModal={closeSubModal}>
        <h3>Sub Modal</h3>
      </SubModal>
    </>
  );
};

export default SettingButton;
