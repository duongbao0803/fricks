import { toast } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

const showToast = (
  type: ToastType,
  description: string,
  duration: number = 2000,
) => {
  const titles: Record<ToastType, string> = {
    success: "Thành công",
    error: "Lỗi",
    warning: "Cảnh báo",
    info: "Thông báo",
  };

  const toastMessage = `${titles[type]}`;

  toast[type](toastMessage, {
    duration,
    description: description,
  });
};

export { showToast };
