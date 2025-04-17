import React from "react";
import Button from "@/components/common/Button";
import { Modal } from "@/components/common/Model";
import useModel from "@/hooks/ui/useModel";
import MediaLibrary from "@/components/common/MediaLibrary/MediaLibrary";

const MediaButton = ({ userId, handleSelectImages, maxSelect }) => {
  const [isModalOpen, openModal, closeModal] = useModel();
  const handleButtonClick = (event) => {
    event.stopPropagation(); // 阻止事件冒泡
    openModal(); // 開啟 Modal
  };
  return (
    <div>
      <Button onClick={handleButtonClick} variant="outline" type="button">
        Open Media
      </Button>
      <Modal
        isOpen={isModalOpen}
        closeModal={(e) => {
          e.stopPropagation(); // 阻止關閉 modal 時冒泡
          closeModal(); // 關閉 modal
        }}
      >
        <MediaLibrary
          userId={userId}
          onSelectImages={handleSelectImages}
          maxSelect={maxSelect}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};

export default MediaButton;
