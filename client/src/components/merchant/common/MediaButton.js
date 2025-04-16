import React from "react";
import Button from "@/components/common/Button";
import { Modal } from "@/components/common/Model";
import useModel from "@/hooks/ui/useModel";
import MediaLibrary from "@/components/common/MediaLibrary/MediaLibrary";

const MediaButton = ({ userId, handleSelectImages, maxSelect }) => {
  const [isModalOpen, openModal, closeModal] = useModel();
  return (
    <div>
      <Button onClick={openModal} variant="outline">
        Open Media
      </Button>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
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
