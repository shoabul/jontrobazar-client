import Swal from "sweetalert2";

export const showToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  return Toast.fire({
    icon,
    title,
  });
};

export const showAlert = ({
  title,
  text,
  icon = "info",
  confirmButtonText = "OK",
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#ea580c",
    confirmButtonText,
  });
};

export const showConfirm = ({
  title,
  text,
  icon = "question",
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  confirmButtonColor = "#ea580c",
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor: "#6b7280",
    confirmButtonText,
    cancelButtonText,
  }).then((result) => result.isConfirmed);
};
