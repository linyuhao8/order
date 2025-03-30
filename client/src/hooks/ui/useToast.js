import toast, { Toaster } from "react-hot-toast";

const useToast = () => {
  const showToast = (message, type = "default", options = {}, emoji = null) => {
    const defaultOptions = {
      duration: 3000,
      position: "top-center",
      icon: emoji,
      style: {
        backgroundColor: "white",
        fontSize: "18px",
        color: "black",
        padding: "10px 18px",
        borderRadius: "8px",
        ...options.style,
      },
      ...options,
    };

    switch (type) {
      case "success":
        toast.success(message, defaultOptions);
        break;
      case "error":
        toast.error(message, defaultOptions);
        break;
      case "info":
        toast(message, defaultOptions);
        break;
      default:
        toast(message, defaultOptions);
    }
  };

  return {
    showSuccess: (message, options, emoji) =>
      showToast(message, "success", options, emoji),
    showError: (message, options, emoji) =>
      showToast(message, "error", options, emoji),
    showInfo: (message, options, emoji) =>
      showToast(message, "info", options, emoji),
  };
};

export default useToast;
