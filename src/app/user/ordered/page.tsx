"use client";
import { Spin } from "antd";
import React, { useState, useEffect } from "react";

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

  const handleButtonClick = (index: React.SetStateAction<number>) => {
    setIsLoading(true);
    setActiveIndex(index);
  };

  // Simulate loading effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading for 1 second
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
        ></div>
      </div>
      <div className="mx-auto rounded-xl bg-[#fff] p-7 shadow-sm transition-all duration-500 lg:px-16">
        {renderComponent()}
      </div>
    </section>
  );
};

export default OrderedList;
