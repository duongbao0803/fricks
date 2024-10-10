"use client";
import { Divider } from "antd";
import Image from "next/image";
import {
  DeleteOutlined,
  HomeFilled,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { tableData } from "@/constants";
import Imagee from "@/assets/images/logo/avatar_admin.jpg";
import { InputCustom } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProductInfo } from "@/types/product.types";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import Cookies from "js-cookie";
import { useGetUserInfoQuery } from "@/apis/authApi";
import { UserInfo } from "@/types/personal.types";
import { RolesLogin } from "@/enums";
import NotFoundImage from "@/assets/images/logo/no-products.png";
import { notify } from "@/components/common/Notification";
import { PriceFormat } from "@/utils";

const OrderTable = () => {
  const router = useRouter();
  const cartData = useSelector(
    (state: RootState) => state.persistedReducer.cart,
  );
  const token = Cookies.get("accessToken");
  const { data } = useGetUserInfoQuery(undefined, {
    skip: !token,
  });
  const userInfo: UserInfo | undefined = data;
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(
    (product: ProductInfo) => {
      if (userInfo && userInfo?.role === RolesLogin.CUSTOMER) {
        dispatch(addToCart(product));
        notify(
          "success",
          `Bạn đã thêm ${product?.name} vào giỏ hàng thành công`,
          3,
        );
      } else {
        notify("info", "Vui lòng đăng nhập để tiếp tục mua hàng", 3);
        return;
      }
    },
    [addToCart],
  );

  const handleRemoveProduct = useCallback(
    (product: ProductInfo) => {
      dispatch(removeFromCart(product));
    },
    [dispatch],
  );

  return (
    <>
      {userInfo &&
      userInfo?.role.includes(RolesLogin.CUSTOMER) &&
      cartData &&
      cartData?.cart.length > 0 ? (
        <section className="mb-10 grid grid-cols-1 gap-4 transition-all duration-500 lg:grid-cols-4">
          <div className="col-span-1 overflow-x-auto bg-[#fff] lg:col-span-3">
            <div className="flex items-center gap-1">
              <span className="rounded-sm bg-[#d0011b] px-2 py-1 text-[12px] text-[#fff]">
                FMALL
              </span>
              <h1>{cartData?.cart[0]?.storeName}</h1>
            </div>
            <Divider className="bg-gray-300" />
            <table className="min-w-full border bg-white">
              <thead className="rounded bg-thirdly">
                <tr>
                  {tableData.map((data, index: number) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-gray-600"
                    >
                      {data}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cartData?.cart?.map((item: ProductInfo, index: number) => (
                  <>
                    <tr className="border-b-0 border-t" key={index}>
                      <td className="px-6 py-[34px]">
                        <div className="flex items-center">
                          <Image
                            height={100}
                            width={100}
                            quality={100}
                            src={item?.image}
                            className="mr-4 h-12 w-12 rounded-[100%]"
                            alt="Product Image"
                          />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      {/* <td className="px-6 py-[34px]">{item?.}</td> */}

                      <td className="px-6 py-[34px]">
                        {item?.price[0]?.price}
                      </td>
                      <td className="px-6 py-[34px]">
                        <div className="flex items-center">
                          <MinusCircleOutlined
                            onClick={() => handleRemoveProduct(item)}
                            className="cursor-pointer text-xl text-black"
                          />
                          <span className="text-md mx-2">{item?.quantity}</span>
                          <PlusCircleOutlined
                            onClick={() => handleAddToCart(item)}
                            className="cursor-pointer text-xl text-primary"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-[34px]">
                        {PriceFormat.format(item?.totalProductPrice ?? 0)}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-span-1">
            <div className="mb-5 border border-gray-300 bg-white">
              <div className="flex h-[48.8px] items-center bg-thirdly pl-4">
                <span className="font-bold text-gray-600">Mã giảm giá</span>
              </div>
              <div className="flex flex-1 flex-col items-center justify-between gap-3 p-3">
                <InputCustom placeholder="Mã giảm giá" className="" />

                <button className="w-full transform rounded bg-primary py-2 font-bold uppercase text-white transition-all duration-500 hover:bg-primary/80 active:scale-95">
                  ÁP DỤNG
                </button>
              </div>
            </div>
            <div className="border border-gray-300 bg-white">
              <div className="flex h-[48.8px] items-center bg-thirdly pl-4">
                <span className="font-bold text-gray-600">Thành tiền</span>
              </div>
              <div className="flex flex-1 items-center justify-between p-4">
                <div className="flex flex-col gap-5">
                  <span className="font-semibold text-gray-500">Tạm tính:</span>
                  <span className="font-semibold text-gray-500">
                    Phí vận chuyển:
                  </span>
                  <span className="font-semibold text-gray-500">
                    Khuyến mãi:
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  <span>{PriceFormat.format(cartData?.totalPrice ?? 0)}</span>
                  <span>Miễn phí</span>
                  <span>{PriceFormat.format(0)}</span>
                </div>
              </div>
              <Divider className="!m-0 bg-gray-300" />
              <div className="flex flex-col justify-between p-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Tổng</span>
                  <span> {PriceFormat.format(cartData?.totalPrice ?? 0)}</span>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => router.push("/checkout")}
                    className="mb-3 w-full transform rounded bg-primary py-2 font-bold uppercase text-white transition-all duration-500 hover:bg-primary/80 active:scale-95"
                  >
                    XÁC NHẬN
                  </button>
                  <button
                    onClick={() => router.push("/product")}
                    className="w-full transform rounded border-2 border-primary py-2 font-bold text-primary transition-all duration-500 hover:bg-gray-300/25 active:scale-95"
                  >
                    MUA THÊM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center">
          <Image
            src={NotFoundImage}
            width={1000}
            height={1000}
            quality={100}
            alt="product"
            className="h-auto w-[500px] object-contain p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
          />
        </div>
      )}
    </>
  );
};

export default OrderTable;
