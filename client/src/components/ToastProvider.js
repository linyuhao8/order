"use client";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

export default function ToastProvider() {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar={false}
      closeOnClick={false}
      pauseOnHover
      draggable
      theme={theme}
    />
  );
}
