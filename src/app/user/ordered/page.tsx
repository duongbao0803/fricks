"use client";
import { TagCustom } from "@/components/common";
import { Divider, Modal, Spin } from "antd";
import Image from "next/image";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";

import React, { useState, useEffect } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import ADMIN from "@/assets/images/logo/avatar_admin.jpg";
import { ButtonCustom } from "@/components/ui/button";
import PaymentSuccess from "@/app/payment/success/page";

// Spinner component
const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 text-primary"></div>
  </div>
);

// Dummy components for each tab
const AllTransactions = () => <p>Tất cả giao dịch</p>;
const SuccessfulTransactions = () => <p>Giao dịch thành công</p>;
const FailedTransactions = () => <p>Giao dịch thất bại</p>;
const PendingTransactions = () => <p>Giao dịch đang chờ</p>;

const OrderedList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleButtonClick = (index: React.SetStateAction<number>) => {
    setIsLoading(true);
    setActiveIndex(index);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  const renderComponent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center">
          <Spin size="large" tip="Đang chờ..." />
        </div>
      );
    }

    switch (activeIndex) {
      case 0:
        return <AllTransactions />;
      case 1:
        return <SuccessfulTransactions />;
      case 2:
        return <FailedTransactions />;
      case 3:
        return <PendingTransactions />;
      default:
        return null;
    }
  };

  return (
    <section>
      <h1 className="mb-2">Giao dịch</h1>
      <div className="relative mx-auto mb-5 flex bg-[#fff] shadow-sm">
        {["Tất cả", "Thành công", "Thất bại", "Đang chờ"].map(
          (label, index) => (
            <button
              key={index}
              className={`relative w-[150px] py-2 transition-all duration-500 ${
                activeIndex === index
                  ? "font-bold text-primary"
                  : "text-gray-500"
              }`}
              onClick={() => handleButtonClick(index)}
            >
              {label}
            </button>
          ),
        )}
        <div
          className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300"
          style={{
            width: "150px",
            left: `${activeIndex * 150}px`,
          }}
        />
      </div>
      <div className="mx-auto rounded-xl bg-[#fff] p-3 shadow-sm transition-all duration-500">
        <div className="flex justify-between">
          <h3 className="font-semibold text-primary">#200803</h3>
          <div className="flex items-center gap-3 font-medium">
            <div className="flex items-center gap-3 text-sm">
              <p className="text-gray-500">Trạng thái:</p>
              <TagCustom
                className="!mr-0"
                label="ĐÃ THANH TOÁN"
                color="green"
                closable={false}
              />
            </div>
            <div className="h-full w-[1px] bg-gray-500" />
            <div className="flex items-center gap-1 text-gray-500">
              <TbTruckDelivery /> <span className="text-sm">14/06/2024</span>
            </div>
          </div>
        </div>
        <Divider className="!my-2 bg-gray-200"></Divider>
        <div>
          <div className="my-6 flex justify-between px-2 text-sm">
            <div className="flex gap-4">
              <Image
                src={ADMIN}
                width={500}
                height={500}
                quality={100}
                alt=""
                className="size-12 object-contain"
              />
              <div>
                <p>Xi măng</p>
                <p>x1/cái</p>
              </div>
            </div>
            <div>190.000 đ</div>
          </div>
          <div className="my-6 flex justify-between px-2 text-sm">
            <div className="flex gap-4">
              <Image
                src={ADMIN}
                width={500}
                height={500}
                quality={100}
                alt=""
                className="size-12 object-contain"
              />
              <div>
                <p>Xi măng</p>
                <p>x1/cái</p>
              </div>
            </div>
            <div>190.000 đ</div>
          </div>{" "}
          <div className="my-6 flex justify-between px-2 text-sm">
            <div className="flex gap-4">
              <Image
                src={ADMIN}
                width={500}
                height={500}
                quality={100}
                alt=""
                className="size-12 object-contain"
              />
              <div>
                <p>Xi măng</p>
                <p>x1/cái</p>
              </div>
            </div>
            <div>190.000 đ</div>
          </div>{" "}
          <div className="my-6 flex justify-between px-2 text-sm">
            <div className="flex gap-4">
              <Image
                src={ADMIN}
                width={500}
                height={500}
                quality={100}
                alt=""
                className="size-12 object-contain"
              />
              <div>
                <p>Xi măng</p>
                <p>x1/cái</p>
              </div>
            </div>
            <div>190.000 đ</div>
          </div>
          <Divider className="!m-0 bg-gray-200"></Divider>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2 text-sm text-[#2bc02b]">
              <CheckCircleFilled color="green" />
              <p>Đã giao hàng</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-5">
                <div>Tổng:</div>
                <div>380.000 đ</div>
              </div>
              <div className="w-full">
                <ButtonCustom
                  onClick={showLoading}
                  className="float-right w-[60%] text-white"
                >
                  Chi tiết
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        width={1000}
        height={600}
        footer={null}
        loading={loading}
        centered
        open={open}
        onCancel={() => setOpen(false)}
        styles={{
          body: { overflowY: "auto", maxHeight: "calc(100vh - 200px)" },
        }}
      >
        <PaymentSuccess></PaymentSuccess>
      </Modal>
    </section>
  );
};

export default OrderedList;
