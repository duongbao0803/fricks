"use client";
import { useGetListOrderQuery, useGetOrderStatusQuery } from "@/apis/orderApi";
import { OrderInfo } from "@/types/order.types";
import { Modal, Spin } from "antd";
import Image from "next/image";
import NotFoundImage from "@/assets/images/logo/no-products.png";
import React, { useEffect, useState } from "react";
import OrderedBill from "./OrderedBill";
import OrderItem from "./OrderItem";
import TransactionTabs from "./TransactionTabs";

const OrderedList: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: listOrder = [] } = useGetListOrderQuery({
    PageIndex: 1,
    PageSize: 20,
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
        {listOrder?.length > 0 ? (
          listOrder.map(
            (order: OrderInfo, index: React.Key | null | undefined) => (
              <OrderItem key={index} order={order} showLoading={showLoading} />
            ),
          )
        ) : (
          <div className="flex justify-center">
            <Image
              src={NotFoundImage}
              alt="No orders available"
              width={450}
              height={450}
              quality={100}
            />
          </div>
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
