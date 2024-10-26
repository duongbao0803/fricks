import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { RolesLogin } from "@/enums";
import { RootState } from "@/redux/store";
import { ProductInfo } from "@/types/product.types";
import { useGetUserInfoQuery } from "@/apis/authApi";
import { UserInfo } from "@/types/personal.types";
import { addToCart, clearCart } from "@/redux/slices/cartSlice";
import { notify } from "@/components/common/Notification";

const useAddToCart = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("accessToken");
  const { data } = useGetUserInfoQuery(undefined, {
    skip: !token,
  });
  const userInfo: UserInfo | undefined = data;
  const cartData = useSelector(
    (state: RootState) => state.persistedReducer.cart,
  );
  const MAX_PRODUCTS = 50;

  const handleAddToCart = useCallback(
    (product: ProductInfo, quantity: number = 1) => {
      if (userInfo && userInfo.role === RolesLogin.CUSTOMER) {
        const isCartEmpty = !cartData?.cart || cartData.cart.length === 0;
        const isSameStore = cartData?.cart?.some(
          (item: { storeId: number }) => item.storeId === product.storeId,
        );
        const totalItems = cartData?.cart.reduce(
          (acc: number, item: ProductInfo) => acc + item.quantity,
          0,
        );

        if (totalItems + quantity > MAX_PRODUCTS) {
          notify(
            "warning",
            `Không thể thêm quá ${MAX_PRODUCTS} sản phẩm vào giỏ hàng`,
            1,
          );
          return;
        }

        if (isCartEmpty || isSameStore) {
          dispatch(addToCart({ product, quantity }));
          notify(
            "success",
            `Bạn đã thêm ${quantity} ${product?.name} vào giỏ hàng thành công`,
            1,
          );
        } else {
          notify(
            "warning",
            "Bạn chỉ có thể thêm sản phẩm của một cửa hàng duy nhất",
            1,
          );
        }
      } else {
        notify("info", "Vui lòng đăng nhập để tiếp tục mua hàng", 1);
      }
    },
    [userInfo, cartData, dispatch],
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return { handleAddToCart, handleClearCart };
};

export default useAddToCart;
