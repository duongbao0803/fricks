"use client";

import { useOrderMutation } from "@/apis/orderApi";
import { useGetStoreDetailQuery } from "@/apis/storeApi";
import VietQR from "@/assets/images/icons/vietqr.jpeg";
import Vnpay from "@/assets/images/icons/vnpay.webp";
import InfoModal from "@/components/sections/checkout/InfoModal";
import { tableData } from "@/constants";
import { PAYMENT } from "@/enums";
import { showToast } from "@/hooks/useShowToast";
import useUserInfo from "@/hooks/useUserInfo";
import { RootState } from "@/redux/store";
import { ProductInfo } from "@/types/product.types";
import { formatCurrency } from "@/utils";
import { Button, Divider, Radio, RadioChangeEvent } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const OrderDetail = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const { userInfo } = useUserInfo();
  const cartData = useSelector(
    (state: RootState) => state.persistedReducer.cart,
  );
  const { data: store } = useGetStoreDetailQuery({
    storeId: cartData?.cart[0]?.storeId,
  });

  const [data, setData] = useState({
    email: "",
    fullName: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (userInfo) {
      const defaultFormData = {
        email: userInfo?.email || "",
        fullName: userInfo?.fullName || "",
        address: "",
        ward: "",
        district: "",
        city: "",
        phoneNumber: userInfo?.phoneNumber || "",
      };

      const existingForm = sessionStorage.getItem("form");
      if (existingForm) {
        const parsedForm = JSON.parse(existingForm);
        const mergedData = {
          ...defaultFormData,
          ...parsedForm,
          email: userInfo?.email || parsedForm.email,
          fullName: userInfo?.fullName || parsedForm.fullName,
          phoneNumber: userInfo?.phoneNumber || parsedForm.phoneNumber,
        };
        sessionStorage.setItem("form", JSON.stringify(mergedData));
        setData(mergedData);
      } else {
        sessionStorage.setItem("form", JSON.stringify(defaultFormData));
        setData(defaultFormData);
      }
    } else {
      const userForm = sessionStorage.getItem("form");
      if (userForm) {
        setData(JSON.parse(userForm));
      }
    }
  }, [userInfo]);

  useEffect(() => {
    const handleStorageChange = () => {
      const userForm = sessionStorage.getItem("form");
      if (userForm) {
        setData(JSON.parse(userForm));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const [checkoutAPI, { isLoading: isCheckoutLoading }] = useOrderMutation();

  const transformedData = cartData?.cart?.map(
    (
      item: ProductInfo & {
        selectedUnit: { id: number; name: string; price: number } | null;
      },
    ) => ({
      productId: item?.id,
      productUnitId: item.selectedUnit?.id,
      quantity: item.quantity,
    }),
  );

  const checkout = {
    shipFee: store?.defaultShip,
    voucherCode: data?.ward === "Tân Phú" ? "FSTANPHU" : "ABC",
    productOrders: transformedData,
    customerPhone: data?.phoneNumber,
    customerAddress: `${data?.address}, ${data?.ward}, ${data?.district}, ${data?.city}`,
    paymentMethod: value,
  };

  let discount = data?.ward === "Tân Phú" ? store?.defaultShip : 0;

  const handlePayment = async () => {
    if (!data?.address || !data?.ward || !data?.district || !data?.city) {
      showToast(
        "info",
        "Vui lòng cập nhật thông tin địa chỉ giao hàng trước khi thanh toán",
      );
      setIsOpen(true);
      return;
    }

    if (!isConfirm) {
      showToast("info", "Vui lòng xác nhận lại đơn hàng trước khi thanh toán");
      return;
    }

    try {
      const res = await checkoutAPI(checkout);
      if (res && res.data) {
        showToast(
          "success",
          "Đặt đơn hàng thành công. Vui lòng chờ sau 3s để thanh toán",
        );
        setTimeout(() => {
          window.location.href = `${res?.data?.checkoutUrl}`;
        }, 3000);
      } else {
        showToast(
          "error",
          "Đặt hàng không thành công. Vui lòng điền đầy đủ thông tin đặt hàng",
        );
      }
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  // Hàm để cập nhật data khi modal đóng
  const handleModalClose = (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (!isOpen) {
      // Khi modal đóng, cập nhật lại data từ sessionStorage
      const userForm = sessionStorage.getItem("form");
      if (userForm) {
        setData(JSON.parse(userForm));
      }
    }
  };

  return (
    <section className="pb-10">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="col-span-1 overflow-x-auto lg:col-span-2">
          <div className="flex justify-between">
            <h1 className="mb-2 font-medium text-[#757575]">
              Thông tin liên hệ
            </h1>
            <button
              onClick={() => setIsOpen(true)}
              className="group relative float-right mb-3 cursor-pointer font-normal text-primary hover:text-primary"
            >
              {data?.address ? "Sửa thông tin" : "Thêm thông tin"}
              <span className="absolute bottom-[-2px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          </div>

          <div className="min-w-full border border-gray-300 bg-[#fff] p-5">
            <div className="grid grid-cols-5 leading-8">
              <div className="col-span-1">
                <p>Email:</p>
                <p>Họ và tên:</p>
                <p>Địa chỉ:</p>
                <p>Số điện thoại:</p>
              </div>
              <div className="col-span-4">
                <p>{data?.email || "Chưa có thông tin"}</p>
                <p>{data?.fullName || "Chưa có thông tin"}</p>
                <p className={!data?.address ? "text-red-500" : ""}>
                  {data?.address && data?.ward && data?.district && data?.city
                    ? `${data.address}, ${data.ward}, ${data.district}, ${data.city}`
                    : "Vui lòng cập nhật địa chỉ giao hàng"}
                </p>
                <p>{data?.phoneNumber || "Chưa có thông tin"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="border border-gray-300 bg-white">
            <div className="flex h-[48.8px] items-center pl-4">
              <span className="font-bold text-gray-600">Thành tiền</span>
            </div>
            <div className="flex flex-1 items-center justify-between p-4">
              <div className="flex flex-col gap-5">
                <span className="font-semibold text-gray-500">Tạm tính:</span>
                <span className="font-semibold text-gray-500">
                  Phí vận chuyển:
                </span>
                <span className="font-semibold text-gray-500">Khuyến mãi:</span>
              </div>
              <div className="flex flex-col items-end gap-5">
                <span> {formatCurrency(cartData?.totalPrice ?? 0)}</span>
                <span>{formatCurrency(store?.defaultShip)}</span>
                <span>{formatCurrency(discount ?? 0)}</span>
              </div>
            </div>
            <div className="mx-4">
              <Divider className="!m-0 bg-gray-300" />
            </div>
            <div className="flex flex-col justify-between p-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-500">Tổng</span>
                <span className="font-bold text-primary">
                  <span>
                    {formatCurrency(
                      cartData?.totalPrice +
                        (store?.defaultShip || 0) -
                        discount,
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="mb-2 font-medium text-[#757575]">Đơn hàng của bạn</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="flex items-center gap-1">
            <span className="rounded-sm bg-[#d0011b] px-2 py-1 text-[12px] text-[#fff]">
              FMALL
            </span>
            <h1>{store?.name}</h1>
          </div>
          <div></div>
          <div className="col-span-1 overflow-auto lg:col-span-2">
            <table className="min-w-full overflow-auto border border-gray-300 bg-white">
              <thead className="rounded bg-thirdly">
                <tr>
                  {tableData.map((data, index: number) => (
                    <th
                      key={index}
                      className={`px-6 py-3 text-left text-gray-600 ${
                        index === 0 ? "sticky left-0 z-10 bg-thirdly" : ""
                      }`}
                    >
                      {data}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cartData?.cart?.map((item, index: number) => (
                  <tr className="border-t" key={index}>
                    <td className="sticky left-0 z-10 bg-white px-6 py-[34px]">
                      <div className="flex items-center">
                        <Image
                          height={100}
                          width={100}
                          quality={100}
                          src={item?.image}
                          className="mr-4 h-12 w-12 rounded-[100%]"
                          alt="Product Image"
                        />
                        <span>{item?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-[34px]">
                      {formatCurrency(item?.selectedUnit?.price ?? 0)}
                    </td>
                    <td className="px-6 py-[34px]">
                      {item?.selectedUnit?.name}
                    </td>
                    <td className="px-6 py-[34px]">{item?.quantity}</td>
                    <td className="px-6 py-[34px]">
                      {formatCurrency(item?.totalProductPrice ?? 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-span-1">
            <div className="mb-8 border border-gray-300 bg-white">
              <label className="block rounded bg-[#fafafa] p-4 font-semibold">
                Phương thức thanh toán
              </label>
              <div className="px-5 py-3">
                <Radio.Group
                  onChange={onChange}
                  className="w-full"
                  value={value}
                >
                  <div className="relative mb-5 flex h-[77px] w-full items-center justify-between rounded border border-[#bebcbc] p-5 hover:border-primary">
                    <Radio
                      value={PAYMENT.VIETQR}
                      className="w-full object-cover"
                    >
                      <div className="inline w-full">
                        <div className="border-1 w-full">Thanh toán VIETQR</div>
                      </div>
                    </Radio>
                    <div className="ml-4">
                      <Image
                        src={VietQR}
                        alt="Logo-vietqr"
                        className="w-full object-cover"
                        height={50}
                        width={50}
                        quality={100}
                      />
                    </div>
                  </div>
                  <div className="relative mb-5 flex h-[77px] w-full items-center justify-between rounded border border-[#bebcbc] p-5 hover:border-primary">
                    <Radio
                      value={PAYMENT.VNPAY}
                      className="w-full object-cover"
                    >
                      <div className="inline w-full">
                        <div className="border-1 w-full">Thanh toán VNPAY</div>
                      </div>
                    </Radio>
                    <div className="ml-4">
                      <Image
                        src={Vnpay}
                        alt="Logo-vietqr"
                        className="w-full object-cover"
                        height={50}
                        width={50}
                        quality={100}
                      />
                    </div>
                  </div>
                </Radio.Group>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    required
                    onChange={(e) => setIsConfirm(e.target.checked)}
                  />
                  <p className="text-sm text-gray-500">
                    Vui lòng xác nhận lại đơn hàng trước khi thanh toán
                  </p>
                </div>
                <Button
                  type="primary"
                  className="text mt-5 h-10 w-full transform rounded py-1 text-base font-bold text-white transition-all duration-500 active:scale-95"
                  onClick={handlePayment}
                  loading={isCheckoutLoading}
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InfoModal
        userInfo={userInfo}
        isOpen={isOpen}
        setIsOpen={handleModalClose}
      />
    </section>
  );
};

export default OrderDetail;
