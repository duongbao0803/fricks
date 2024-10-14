import { useGetUserInfoQuery } from "@/apis/authApi";
import Cookies from "js-cookie";

const useUserInfo = () => {
  const token = Cookies.get("accessToken");
  const {
    data: userInfo,
    isLoading,
    isError,
  } = useGetUserInfoQuery(undefined, {
    skip: !token,
  });

  return { userInfo, isLoading, isError };
};

export default useUserInfo;
