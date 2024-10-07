import { BannerCustom, BreadScrumb } from "@/components/common";
import React from "react";
import OrderTable from "./OrderTable";

const CartPage = () => {
  const items = [
    {
      href: "/product",
      title: "Sản phẩm",
    },
    {
      title: "Giỏ hàng",
    },
  ];
  return (
    <main className="min-h-screen">
      <BannerCustom title="Giỏ hàng" />
      <div className="container mx-auto">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <OrderTable />
      </div>
    </main>
  );
};

export default CartPage;
