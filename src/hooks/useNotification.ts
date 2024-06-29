import { toast } from "react-toastify";

function useNotification() {
  return (
    type: "success" | "error" | "warning",
    message: string,
    delay?: number
  ) =>
    toast[type](message, {
      theme: "light",
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      position: "top-right",
      hideProgressBar: false,
      autoClose: delay || 3000,
    });
}

export default useNotification;
