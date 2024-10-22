"use client";
import React, { useEffect, useState } from "react";
import { Spin, Modal } from "antd";
import { useGetListOrderQuery, useGetOrderStatusQuery } from "@/apis/orderApi";
import PaymentSuccess from "@/app/payment/success/page";
import TransactionTabs from "./TransactionTabs";
import OrderItem from "./OrderItem";
import { OrderInfo } from "@/types/order.types";
import OrderedBill from "./OrderedBill";

const OrderedList: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: listOrder = [] } = useGetListOrderQuery({
    PageIndex: 1,
    PageSize: 10,
  });
  const orderId = JSON.parse(sessionStorage.getItem("orderId") as string);
  const { data: orderInfo } = useGetOrderStatusQuery({
    orderId: orderId,
  });

  const showLoading = (id: number) => {
    sessionStorage.setItem("orderId", JSON.stringify(id));
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleButtonClick = (index: number) => {
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
          <Spin size="large" tip="Đang chờ..." className="text-[red]" />
        </div>
      );
    }

    return (
      <>
        {listOrder.length > 0 &&
          listOrder.map(
            (order: OrderInfo, index: React.Key | null | undefined) => (
              <OrderItem key={index} order={order} showLoading={showLoading} />
            ),
          )}
      </>
    );
  };

  return (
    <section>
      <h1 className="mb-2">Giao dịch</h1>
      <TransactionTabs
        activeIndex={activeIndex}
        handleButtonClick={handleButtonClick}
      />
      {renderComponent()}
      <Modal
        width={1000}
        height={600}
        styles={{
          body: {
            maxHeight: "80vh",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          },
        }}
        footer={null}
        open={open}
        onCancel={() => setOpen(false)}
      >
        {loading ? (
          <Spin
            size="large"
            tip="Đang chờ..."
            className="flex justify-center"
          />
        ) : (
          <OrderedBill orderInfo={orderInfo} />
        )}
      </Modal>
    </section>
  );
};

export default OrderedList;
