// Modal.js
import React from "react";

export default function Modal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center w-[auto] h-[auto] z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all scale-100 opacity-100 duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
