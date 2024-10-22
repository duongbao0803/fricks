import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { notify } from "@/components/common/Notification";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slices/userSlice";
import apiSlice from "@/apis/apiSlice";
import { clearCart } from "@/redux/slices/cartSlice";

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    sessionStorage.clear();
    router.replace("/auth");
    setTimeout(() => {
      dispatch(setUserInfo(null));
      dispatch(clearCart());
      dispatch(apiSlice.util.resetApiState());
    }, 1000);
    notify("success", "Đăng xuất thành công", 3);
  };

  return { logout };
};
