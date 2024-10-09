"use client";
import { useGetDetailProductQuery } from "@/apis/productApi";
import { ProductInfo } from "@/types/product.types";
import { PriceFormat } from "@/utils";
import { Spin } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const Detail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetDetailProductQuery({
    productId: id,
  });
  const typedProduct = product as ProductInfo;
  const [selectedPrice, setSelectedPrice] = useState<string>(
    typedProduct?.price[0]?.price,
  );

  const handleChangeUnit = (values) => {
    setSelectedPrice(values?.price);
  };

  return (
    <div className="container mx-auto bg-white p-6">
      {isLoading ? (
        <Spin size="large" tip="Đang chờ..." fullscreen />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Image
                src={typedProduct?.image}
                height={2000}
                width={2000}
                quality={100}
                alt="sản phẩm"
                className="max-h-[400px] w-full rounded-lg object-fill transition-opacity duration-300"
              />
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-gray-700">
                {typedProduct?.name}
              </h2>
              <div className="mt-2 items-center">
                <div className="flex text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <span key={i}>&#9733;</span>
                  ))}
                  <span className="text-gray-400">&#9733;</span>
                  <span className="ml-2 text-gray-400">4/5</span>
                </div>
                <p className="text-sm text-gray-500">
                  Thương hiệu:{" "}
                  <span className="text-primary">
                    {typedProduct?.brand?.name}
                  </span>
                </p>
              </div>
              <p className="my-5 text-3xl font-bold text-primary">
                {PriceFormat.format(selectedPrice)}
              </p>

              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center rounded-md border border-gray-300">
                  <button className="px-3 py-1 text-gray-500">-</button>
                  <input
                    type="number"
                    value="1"
                    className="w-12 border-l border-r border-gray-300 text-center outline-none"
                  />
                  <button className="px-3 py-1 text-gray-500">+</button>
                </div>
                <button
                  // onClick={handleAddToCart}
                  className="rounded-md bg-primary px-8 py-3 font-semibold text-white hover:bg-secondary"
                >
                  Thêm giỏ hàng
                </button>
                <button className="rounded-md border border-gray-300 p-3 text-gray-500 hover:bg-secondary">
                  &#9825;
                </button>
              </div>
              <div className="flex gap-5">
                {typedProduct?.price?.map((typeUnit, index) => (
                  <div key={index} className="flex gap-5 border border-red-500">
                    <button onClick={() => handleChangeUnit(typeUnit)}>
                      {typeUnit?.unit?.name}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-md border border-gray-500 p-4">
                <h3 className="mb-2 font-semibold text-gray-700">
                  CHÍNH SÁCH BÁN HÀNG
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">&#128663;</span> Miễn phí vận chuyển
                    (Nội thành HCM)
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">&#8635;</span> Hoàn trả miễn phí
                    (Trong vòng 24h)
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">&#128179;</span> Thanh toán (Chuyển
                    khoản/COD)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-4 border-b border-gray-200">
              <ul className="flex space-x-4">
                <li className="font-semibold text-gray-600">CHI TIẾT</li>
                <li className="cursor-pointer text-gray-500 hover:text-gray-700">
                  HƯỚNG DẪN MUA HÀNG
                </li>
                <li className="cursor-pointer text-gray-500 hover:text-gray-700">
                  CHÍNH SÁCH HOÀN TRẢ
                </li>
              </ul>
            </div>

            <div className="text-gray-700">
              <h4 className="mb-2 font-semibold">{typedProduct?.name}</h4>
              <p className="mb-2">{typedProduct?.description}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-700">
              Sản phẩm liên quan
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-lg border border-gray-200 p-4">
                  <div className="relative">
                    {/* <span className="absolute left-0 top-0 bg-red-500 px-2 py-1 text-xs text-white">
                  NEW
                </span> */}
                    <Image
                      height={300}
                      width={300}
                      quality={100}
                      src={typedProduct?.image}
                      alt="sản phẩm liên quan"
                      className="h-40 w-full rounded-md object-contain"
                    />
                  </div>
                  <h4 className="mt-2 text-lg font-semibold text-gray-700">
                    {typedProduct?.name}
                  </h4>
                  <p className="mt-1 text-gray-500">
                    {typedProduct?.price[0]?.price}
                  </p>
                  <button className="mt-2 w-full rounded-md bg-primary py-2 text-white hover:bg-secondary">
                    Thêm giỏ hàng
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold tracking-widest text-gray-700">
              ĐÁNH GIÁ
            </h3>

            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <p className="text-gray-600">Đánh giá của bạn:</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="cursor-pointer">
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <textarea
                  rows={4}
                  placeholder="Mô tả.."
                  className="w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="mt-2 rounded-md bg-primary px-6 py-2 font-semibold text-white hover:bg-secondary">
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
