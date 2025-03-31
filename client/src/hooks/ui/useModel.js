"use client";
import { useState } from "react";

//Responsible for controlling the opening and closing of the model
const useModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return [isOpen, openModal, closeModal];
};

export default useModel;
