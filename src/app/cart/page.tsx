import { BannerCustom, BreadScrumb } from "@/components/common";
import { Divider } from "antd";
import {
  HomeFilled,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import React from "react";

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
        <section className="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-4">
          <div className="col-span-1 overflow-x-auto lg:col-span-3">
            <table className="min-w-full border border-gray-300 bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600">Flower</th>
                  <th className="px-6 py-3 text-left text-gray-600">Price</th>
                  <th className="px-6 py-3 text-left text-gray-600">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600">Total</th>
                  <th className="px-6 py-3 text-left text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="flex items-center px-6 py-4">
                    <img
                      src="flower1.jpg"
                      className="mr-4 h-12 w-12 rounded"
                      alt="Pink Flower Tree"
                    />
                    <span>Pink Flower Tree</span>
                  </td>
                  <td className="px-6 py-4">$18.00</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MinusCircleOutlined
                        // onClick={() => handleRemove(record)}
                        className="text-xl text-[black]"
                      />
                      <span className="text-md mx-2">1</span>
                      <PlusCircleOutlined
                        className="text-xl text-[#08cde9]"
                        // onClick={() => addToCart(record)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">$18.00</td>
                  <td className="px-6 py-4">
                    <button className="rounded bg-red-500 px-4 py-1 text-white">
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-span-1 overflow-x-auto">
            <div className="h-full rounded bg-white">
              <div className="flex h-[48.8px] items-center bg-gray-200 pl-4">
                <span className="font-bold">Cart total</span>
              </div>
              <div className="flex flex-1 items-center justify-between p-3">
                <div className="flex flex-col gap-5">
                  <span className="font-semibold text-gray-500">Subtotal:</span>
                  <span className="font-semibold text-gray-500">Shipping:</span>
                  <span className="font-semibold text-gray-500">Voucher:</span>
                </div>
                <div className="flex flex-col gap-5">
                  <span>$167.00</span>
                  <span>$3.00</span>
                  <span>$3.00</span>
                </div>
              </div>
              <Divider className="!m-0 !p-0">
                <div className="h-1 w-full bg-gray-500"></div>
              </Divider>
              <div className="mb-2 flex justify-between p-3">
                <span className="font-semibold text-gray-500">Total</span>
                <span>$167.00</span>
              </div>
              <button className="mb-3 w-full rounded bg-primary py-2 text-white">
                CHECK OUT
              </button>
              <button className="w-full rounded border-2 border-primary py-2 font-bold text-primary">
                BUY MORE
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CartPage;
