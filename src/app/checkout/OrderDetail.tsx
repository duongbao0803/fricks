"use client";
import { Button, Divider, Form, Radio } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { tableData, tableDataCheckout } from "@/constants";
import Imagee from "@/assets/images/logo/avatar_admin.jpg";
import { InputCustom } from "@/components/ui/input";
import { ButtonCustom } from "@/components/ui/button";
import BankIcon from "@/assets/images/icons/bank.png";
import InfoModal from "./InfoModal";

const OrderDetail = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const data = [
    {
      storeName: "FPT",
      productName: "Ống nước",
      price: "18000",
      quantity: 20,
      total: 30,
    },
  ];
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
              Thêm thông tin
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
                <p>duongbao@gmail.com</p>
                <p>Dương Tôn Bảo</p>
                <p>Vũng Tàu</p>
                <p>0909113114</p>
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
              <div className="flex flex-col gap-5">
                <span>$167.00</span>
                <span>$3.00</span>
                <span>$3.00</span>
              </div>
            </div>
            <Divider className="!m-0 bg-gray-300" />
            <div className="flex flex-col justify-between p-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-500">Tổng</span>
                <span className="font-bold text-primary">$167.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="mb-2 font-medium text-[#757575]">Đơn hàng của bạn</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="col-span-1 overflow-x-auto lg:col-span-2">
            <table className="min-w-full border border-gray-300 bg-white">
              <thead className="rounded bg-gray-100">
                <tr>
                  {tableDataCheckout.map((data, index: number) => (
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
                {data.map((item, index: number) => (
                  <>
                    <tr className="border-t" key={index}>
                      <td className="px-6 py-[34px] align-middle">
                        <div className="flex items-center">
                          <Image
                            height={100}
                            width={100}
                            quality={100}
                            src={Imagee}
                            className="mr-4 h-12 w-12 rounded-[100%]"
                            alt="Store Image"
                          />
                          <span>{item.storeName}</span>
                        </div>
                      </td>

                      <td className="px-6 py-[34px]">
                        <div className="flex items-center">
                          <Image
                            height={100}
                            width={100}
                            quality={100}
                            src={Imagee}
                            className="mr-4 h-12 w-12 rounded-[100%]"
                            alt="Product Image"
                          />
                          <span>{item.productName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-[34px]">{item.price}</td>
                      <td className="px-6 py-[34px]">{item.quantity}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-span-1">
            {/* <div className="border border-gray-300 bg-white">
              <div className="flex h-[48.8px] items-center pl-4">
                <span className="font-bold text-gray-600">Thành tiền</span>
              </div>
              <div className="flex flex-1 items-center justify-between p-3">
                <div className="flex flex-col gap-5">
                  <span className="font-semibold text-gray-500">Tổng phụ:</span>
                  <span className="font-semibold text-gray-500">
                    Phí vận chuyển:
                  </span>
                  <span className="font-semibold text-gray-500">
                    Khuyến mãi:
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  <span>$167.00</span>
                  <span>$3.00</span>
                  <span>$3.00</span>
                </div>
              </div>
              <Divider className="!m-0 bg-gray-300" />
              <div className="flex flex-col justify-between p-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Tổng</span>
                  <span className="font-bold text-primary">$167.00</span>
                </div>
              </div>
            </div> */}
            <div className="mb-8 border border-gray-300 bg-white">
              <label className="block rounded bg-[#fafafa] p-4 font-semibold">
                Phương thức thanh toán
              </label>
              <div className="px-5 py-3">
                <Radio.Group
                  // onChange={onChange}
                  className="w-full"
                  // value={value}
                >
                  {/* {infoUser && infoUser?.role === Role.MEMBER && ( */}
                  <div className="relative mb-5 flex w-full items-center justify-between rounded border border-[#bebcbc] p-5 hover:border-primary">
                    <Radio value={"PAYOS"} className="w-full" defaultChecked>
                      <div className="inline w-full">
                        <div className="border-1 w-full">
                          Thanh toán chuyển khoản
                        </div>
                      </div>
                    </Radio>
                    <div className="ml-4">
                      <Image
                        src={BankIcon}
                        alt="Logo-vnpay"
                        className="w-11"
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
                    // onChange={(e) => setIsConfirm(e.target.checked)}
                  />
                  <p className="text-sm text-gray-500">
                    Vui lòng xác nhận lại đơn hàng trước khi thanh toán
                  </p>
                </div>
                <ButtonCustom
                  className="mt-5 h-10 w-full transform rounded py-1 text-white transition-all duration-500 active:scale-95"
                  // onClick={handlePayment}
                >
                  Thanh toán
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InfoModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
};

export default OrderDetail;
