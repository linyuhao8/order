"use client";
import { useState } from "react";

// import useModal from "@/hooks/ui/useModal";
//  const [isModalOpen, openModal, closeModal] = useModal();

//Responsible for controlling the opening and closing of the model
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return [isOpen, openModal, closeModal];
};

export default useModal;
