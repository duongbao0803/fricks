"use client";
import { Divider } from "antd";
import Image from "next/image";
import {
  DeleteOutlined,
  HomeFilled,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import React from "react";
import { useRouter } from "next/navigation";
import { tableData } from "@/constants";
import Imagee from "@/assets/images/logo/avatar_admin.jpg";
import { InputCustom } from "@/components/ui/input";

const OrderTable = () => {
  const router = useRouter();

  const data = [
    {
      storeName: "FPT",
      // image: { Image },
      productName: "Ống nước",
      // productImage: "../../assets/images/logo/avatar_admin.jpg",
      price: "18000",
      quantity: 20,
      total: 30,
    },
  ];
  return (
    <section className="mb-10 grid grid-cols-1 gap-4 transition-all duration-500 lg:grid-cols-4">
      <div className="col-span-1 overflow-x-auto lg:col-span-3">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="rounded bg-gray-200">
            <tr>
              {tableData.map((data, index: number) => (
                <th key={index} className="px-6 py-3 text-left text-gray-600">
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
                  <td className="px-6 py-[34px]">
                    <div className="flex items-center">
                      <MinusCircleOutlined
                        // onClick={() => handleRemove(record)}
                        className="cursor-pointer text-xl text-black"
                      />
                      <span className="text-md mx-2">1</span>
                      <PlusCircleOutlined
                        // onClick={() => addToCart(record)}
                        className="cursor-pointer text-xl text-primary"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-[34px]">{item.price}</td>
                  <td className="px-6 py-[34px] text-center">
                    <DeleteOutlined
                      // onClick={() => handleDelete(record)}
                      className="cursor-pointer text-xl text-red-500"
                    />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-span-1">
        <div className="mb-5 border border-gray-300 bg-white">
          <div className="flex h-[48.8px] items-center bg-gray-200 pl-4">
            <span className="font-bold text-gray-600">Mã giảm giá</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-between gap-3 p-3">
            <InputCustom placeholder="Mã giảm giá" className="" />

            <button className="w-full transform rounded bg-primary py-2 font-bold uppercase text-white transition-all duration-500 hover:bg-primary/80 active:scale-95">
              XÁC NHẬN
            </button>
          </div>
        </div>
        <div className="border border-gray-300 bg-white">
          <div className="flex h-[48.8px] items-center bg-gray-200 pl-4">
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
              <span>$167.00</span>
            </div>
            <div className="mt-5">
              <button
                onClick={() => router.push("/checkout")}
                className="mb-3 w-full transform rounded bg-primary py-2 font-bold uppercase text-white transition-all duration-500 hover:bg-primary/80 active:scale-95"
              >
                XÁC NHẬN
              </button>
              <button
                onClick={() => router.push("/product")}
                className="w-full transform rounded border-2 border-primary py-2 font-bold text-primary transition-all duration-500 hover:bg-gray-300/25 active:scale-95"
              >
                MUA THÊM
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderTable;
