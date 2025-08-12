import { useGetUserInfoQuery } from "@/apis/authApi";
import { RolesLogin } from "@/enums";
import { showToast } from "@/hooks/useShowToast";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateCartItemUnit,
} from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import { UserInfo } from "@/types/personal.types";
import { ProductInfo } from "@/types/product.types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCart = () => {
  const router = useRouter();
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
    (
      product: ProductInfo,
      quantity: number = 1,
      selectedUnit: {
        name: string;
        price: number;
        productUnitId: number;
      } | null,
    ) => {
      if (userInfo && userInfo.role === RolesLogin.CUSTOMER) {
        const isCartEmpty = !cartData?.cart || cartData.cart.length === 0;
        const isSameStore = cartData?.cart?.some(
          (item: { storeId: number }) => item.storeId === product.storeId,
        );

        const productQuantityInCart =
          cartData?.cart?.find(
            (
              item: ProductInfo & {
                selectedUnit: { name: string; price: number } | null;
              },
            ) =>
              item.id === product.id &&
              item.selectedUnit?.name === selectedUnit?.name,
          )?.quantity || 0;

        const productQuantityInCart1 = cartData?.cart?.find(
          (
            item: ProductInfo & {
              selectedUnit: { name: string; price: number } | null;
            },
          ) =>
            item.id === product.id &&
            item.selectedUnit?.name === selectedUnit?.name,
        );

        console.log("check productQuantityInCart1", productQuantityInCart1);
        console.log("check selectedUnit", selectedUnit);

        if (productQuantityInCart + quantity > MAX_PRODUCTS) {
          showToast(
            "warning",
            `Không thể thêm quá 50 sản phẩm ${product?.name} (${selectedUnit?.name}) vào giỏ hàng`,
          );
          return;
        }

        if (isCartEmpty || isSameStore) {
          dispatch(
            addToCart({
              product: {
                ...product,
                selectedUnit: selectedUnit
                  ? {
                      name: selectedUnit.name,
                      price: selectedUnit.price,
                      id: selectedUnit.productUnitId,
                    }
                  : null,
              },
              quantity,
            }),
          );
          showToast(
            "success",
            `Bạn đã thêm ${quantity} ${product?.name} (${selectedUnit?.name}) vào giỏ hàng thành công`,
          );
        } else {
          showToast(
            "warning",
            "Bạn chỉ có thể thêm sản phẩm của một cửa hàng duy nhất",
          );
        }
      } else {
        router.push("/auth");
        showToast("info", "Vui lòng đăng nhập để tiếp tục mua hàng");
      }
    },
    [userInfo, cartData, dispatch, router],
  );

  const handleRemoveFromCart = useCallback(
    (
      productId: number,
      selectedUnit: { name: string; price: number } | null,
    ) => {
      dispatch(removeFromCart({ productId, selectedUnit }));
      showToast(
        "success",
        `Đã xóa sản phẩm (${selectedUnit?.name}) khỏi giỏ hàng`,
      );
    },
    [dispatch],
  );

  const handleUpdateCartItemUnit = useCallback(
    (
      productId: number,
      oldUnitName: string | null,
      newUnit: { name: string; price: number; id: number } | null,
    ) => {
      dispatch(updateCartItemUnit({ productId, oldUnitName, newUnit }));
      showToast("success", `Đã cập nhật đơn vị thành ${newUnit?.name}`);
    },
    [dispatch],
  );

  const handleClearCart = () => {
    dispatch(clearCart());
    showToast("success", "Đã xóa toàn bộ giỏ hàng");
  };

  return {
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateCartItemUnit,
    handleClearCart,
  };
};

export default useCart;
