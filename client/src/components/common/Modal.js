//createPortal lets you render some children into a different part of the DOM.
import { createPortal } from "react-dom";

{
  /* <Modal
  isOpen={isModalOpen}
  closeModal={(e) => {
    e.stopPropagation(); // 阻止關閉 modal 時冒泡
    closeModal(); // 關閉 modal
  }}
>
  <MediaLibrary />
</Modal>; */
}

//Both use createPortal to avoid confusion in UI hierarchy.
export const Modal = ({ isOpen, closeModal, children }) => {
  //Prevent SSR errors: Add typeof document === "undefined" judgment to ensure that document.body is only executed on the browser side.
  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-2"
      onClick={closeModal}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all scale-100 opacity-100 duration-300 ease-in-out max-h-[90vh] overflow-y-auto w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export const SubModal = ({ isOpen, closeModal, children }) => {
  //Prevent SSR errors: Add typeof document === "undefined" judgment to ensure that document.body is only executed on the browser side.
  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2" onClick={closeModal}>
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
