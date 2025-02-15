import Swal from "sweetalert2";
import "./ToastConditional.css";

interface ToastMessages {
  title: string;
  text: string;
  confirmButtonText: string;
  cancelButtonText: string;
  confirmButtonColor?: "red" | "black" | string; 
}


const ToastConditional = async (messages: ToastMessages): Promise<boolean> => {
  const result = await Swal.fire({
    title: messages.title,
    text: messages.text,
    icon: "warning",
    background: "white",
    color: "#333",
    iconColor: "black",
    showCancelButton: true,
    confirmButtonText: messages.confirmButtonText || "Aceptar",
    cancelButtonText: messages.cancelButtonText,
    buttonsStyling: false,
    customClass: {
      popup: "swal-container",
      confirmButton: messages.confirmButtonColor === "red" ? "swal-confirm-btn-red" : "swal-confirm-btn-black",
      cancelButton: "swal-cancel-btn",
    },
  });

  return result.isConfirmed;
};

export default ToastConditional;
