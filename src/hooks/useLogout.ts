import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { notify } from "@/components/Notification";

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.replace("/auth");
    notify("success", "Đăng xuất thành công", 3);
  };

  return { logout };
};
