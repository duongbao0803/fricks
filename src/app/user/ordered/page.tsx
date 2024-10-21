"use client";
import { TagCustom } from "@/components/common";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Divider, Modal, Spin } from "antd";
import { useGetListOrderQuery } from "@/apis/orderApi";
import PaymentSuccess from "@/app/payment/success/page";
import { ButtonCustom } from "@/components/ui/button";
import { OrderInfo } from "@/types/order.types";
import { formatTimestamp, PriceFormat } from "@/utils";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";

const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 text-primary"></div>
  </div>
);

const AllTransactions = () => <p>Tất cả giao dịch</p>;
const SuccessfulTransactions = () => <p>Giao dịch thành công</p>;
const FailedTransactions = () => <p>Giao dịch thất bại</p>;
const PendingTransactions = () => <p>Giao dịch đang chờ</p>;

const OrderedList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { data: listOrder = [] } = useGetListOrderQuery({
    PageIndex: 1,
    PageSize: 10,
    OrderStatus: "",
    PaymentStatus: "",
  });

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
      {listOrder &&
        listOrder?.length > 0 &&
        listOrder.map((order: OrderInfo, index: number) => (
          <div
            className="mx-auto mb-5 rounded-xl bg-[#fff] p-3 shadow-sm transition-all duration-500"
            key={index}
          >
            <div className="flex justify-between">
              <h3 className="font-semibold text-primary">#{order?.code}</h3>
              <div className="flex items-center gap-3 font-medium">
                <div className="flex items-center gap-3 text-sm">
                  <p className="text-gray-500">Trạng thái:</p>
                  {order?.paymentStatus !== "FAILED" ? (
                    <TagCustom
                      className="!mr-0"
                      label="ĐÃ THANH TOÁN"
                      color="green"
                      closable={false}
                    />
                  ) : (
                    <TagCustom
                      className="!mr-0"
                      label="CHƯA THANH TOÁN"
                      color="red"
                      closable={false}
                    />
                  )}
                </div>
                <div className="h-full w-[1px] bg-gray-500" />
                <div className="flex items-center gap-1 text-gray-500">
                  <TbTruckDelivery />{" "}
                  <span className="text-sm">
                    {formatTimestamp(order?.paymentDate)}
                  </span>
                </div>
              </div>
            </div>
            <Divider className="!my-2 bg-gray-200"></Divider>
            <div>
              <div className="my-6 flex items-center justify-between px-2 text-sm">
                <div className="flex flex-col gap-4">
                  <div>
                    <p>{order?.storeName}</p>
                    <p>{order?.storeAddress}</p>
                    <p>{order?.storePhone}</p>
                  </div>
                </div>
                <div>
                  <FaArrowRightLong size={20} color="orange" />
                </div>
                <div className="flex justify-end gap-4">
                  <div>
                    <p>{order?.customerName}</p>
                    <p>{order?.customerAddress}</p>
                    <p>{order?.customerPhone}</p>
                  </div>
                </div>
              </div>
              <Divider className="!m-0 bg-gray-200"></Divider>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-col justify-between gap-3">
                  {order?.paymentStatus !== "FAILED" ? (
                    <div className="flex gap-2 text-sm text-[#00b7ff]">
                      <CheckCircleFilled color="blue" />
                      <p>Đang giao hàng...</p>
                    </div>
                  ) : (
                    <div className="flex gap-2 text-sm text-[red]">
                      <CloseCircleFilled color="red" />
                      <p>Đang chờ...</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between gap-5">
                    <div>Phí vận chuyển:</div>
                    <div>{PriceFormat.format(0)}</div>
                  </div>
                  <div className="flex justify-between gap-5">
                    <div>Giảm giá:</div>
                    <div>{PriceFormat.format(0)}</div>
                  </div>
                  <div className="flex justify-between gap-5">
                    <div>Tổng:</div>
                    <div>{PriceFormat.format(order?.total)}</div>
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
        ))}

      <Modal
        width={1000}
        height={600}
        footer={null}
        loading={loading}
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
