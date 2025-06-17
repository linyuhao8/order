"use client";
import { useState } from "react";

// import useModel from "@/hooks/ui/useModel";
//  const [isModalOpen, openModal, closeModal] = useModel();

//Responsible for controlling the opening and closing of the model
const useModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return [isOpen, openModal, closeModal];
};

export default useModel;
