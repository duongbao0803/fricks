import { BannerCustom, BreadScrumb } from "@/components/common";
import React from "react";
import OrderDetail from "./OrderDetail";

const CheckoutPage = () => {
  const items = [
    {
      href: "/product",
      title: "Sản phẩm",
    },
    {
      href: "/cart",
      title: "Giỏ hàng",
    },
    {
      title: "Thanh toán",
    },
  ];
  return (
    <main className="min-h-screen bg-[#f4f4f48e]">
      <BannerCustom title="Thanh toán" />
      <div className="container mx-auto">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <OrderDetail />
      </div>
    </main>
  );
};

export default CheckoutPage;
