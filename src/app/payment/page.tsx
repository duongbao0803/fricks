"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import IconWeb from "@/assets/images/logo/logo_web.png";
import Image from "next/image";
import { PriceFormat } from "@/utils";
import { tableInvoice } from "@/constants";
import { useGetOrderStatusQuery } from "@/apis/orderApi";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";
import { setOrderInfo } from "@/redux/slices/orderSlice";
import { Spin } from "antd";

const PaymentView: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [id, setId] = useState<number>(0);
  const { data: orderInfo, isLoading } = useGetOrderStatusQuery({
    orderId: id,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const status = searchParams.get("status");
    const orderId = searchParams.get("order");

    if (orderId) {
      setId(Number(orderId));
    }

    if (orderInfo && !isLoading) {
      dispatch(setOrderInfo(orderInfo));
    }

    if (status === "paid") {
      console.log("Clearing cart...");
      dispatch(clearCart());
      // router.replace("/payment/success");
      sessionStorage.removeItem("form");
    } else {
      router.replace("/payment/failure");
    }
  }, [searchParams, router, orderInfo, isLoading, dispatch]);
  return (
    <section className="h-screen">
      <Spin fullscreen tip="Đang chờ..." />
      {/* <main className="container mx-auto my-5 grid min-h-screen place-items-center">
        <section className="relative h-auto min-h-[800px] border-2 border-primary shadow-xl md:w-[650px] lg:w-[800px]">
          <div className="p-10">
            <div className="flex justify-between">
              <h1 className="flex items-center text-4xl font-black tracking-wider">
                HÓA ĐƠN
              </h1>
              <Image
                src={IconWeb}
                width={150}
                alt="icon"
                quality={100}
                className="mb-3"
              />
            </div>
            <div className="leading-7">
              <p>
                <span className="font-bold">Thời gian:</span>{" "}
                <span>13/10/2024</span>
              </p>
              <p>
                <span className="font-bold">Mã hóa đơn: </span>
                <span>#123123</span>
              </p>
            </div>
            <div className="my-8 flex justify-between">
              <div className="max-w-[45%]">
                <h3 className="text-sm">CỬA HÀNG</h3>
                <p className="py-1 text-lg font-bold">Gia đức VLXD</p>
                <p className="py-1 text-sm">Bà Rịa Vũng Tàu</p>
                <p className="py-1 text-sm">0909 113 114</p>
              </div>
              <div className="max-w-[45%] text-right">
                <h3 className="text-sm">KHÁCH HÀNG</h3>
                <p className="py-1 text-lg font-bold">Bảo Vũng Tàu</p>
                <p className="py-1 text-sm">Bà Rịa Vũng Tàu</p>
                <p className="py-1 text-sm">0909 114 115</p>
              </div>
            </div>
            <div className="overflow-auto">
              <table className="min-w-full overflow-auto border-none bg-white">
                <thead className="rounded">
                  <tr>
                    {tableInvoice.map((data, index: number) => (
                      <th
                        key={index}
                        className={`border-b-2 px-6 py-3 text-left text-gray-600 ${
                          index === 0 ? "sticky left-0 z-10" : ""
                        }`}
                      >
                        {data}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="sticky left-0 z-10 bg-white px-6 py-[34px]">
                      <div className="flex items-center">
                        <span>hihi</span>
                      </div>
                    </td>
                    <td className="px-6 py-[34px]">hii</td>
                    <td className="px-6 py-[34px]">hihi</td>
                    <td className="px-6 py-[34px]">hihi</td>
                  </tr>
                  <tr className="">
                    <td className="sticky left-0 z-10 bg-white px-6 py-[34px]">
                      <div className="flex items-center">
                        <span>hihi</span>
                      </div>
                    </td>
                    <td className="px-6 py-[34px]">hii</td>
                    <td className="px-6 py-[34px]">hihi</td>
                    <td className="px-6 py-[34px]">hihi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-10 mt-5 flex min-h-[400px] justify-center">
            <div className="flex h-[150px] w-[350px] -rotate-[15deg] flex-col items-center justify-center gap-2 rounded-3xl border-4 border-[red] font-medium text-[red]">
              <h2 className="text-4xl">ĐÃ THANH TOÁN</h2>
              <p className="text-xl font-bold">{PriceFormat.format(12345)}</p>
              <p>13/10/2024</p>
            </div>
          </div>
          <div className="absolute bottom-0 min-h-[150px] w-full bg-primary px-10 py-5">
            <div className="flex justify-between font-bold text-white">
              <p>Thông tin bổ sung</p>
              <p>Tổng</p>
            </div>
            <div className="my-2 h-[2px] w-full bg-white" />
            <div className="grid grid-cols-1 sm:grid-cols-5">
              <div className="col-span-3">
                <div className="grid grid-cols-3 leading-8">
                  <div className="col-span-1 font-semibold text-white">
                    <p>Cửa hàng:</p>
                    <p>Điều khoản:</p>
                  </div>
                  <div className="col-span-2 text-left text-gray-200">
                    <p>Gia Đức VLXD</p>
                    <p>Thanh toán 100%</p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 col-start-4">
                <div className="grid grid-cols-3 leading-8">
                  <div className="col-span-1 font-semibold text-white">
                    <p>Tạm tính:</p>
                    <p>Tổng:</p>
                  </div>
                  <div className="col-span-2 text-right text-gray-200">
                    <p>123456789</p>
                    <p>123456789</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-2 h-[2px] w-full bg-white" />
            <p className="text-center text-white">
              Xin cảm ơn quý khách đã ủng hộ
            </p>
          </div>
        </section>
      </main> */}
    </section>
  );
};

export default PaymentView;
