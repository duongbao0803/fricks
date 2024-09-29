"use client";
import { Skeleton } from "antd";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import Link from "next/link";

const ProductHome = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedCategoryElement = document.getElementById(
      `category-${selectedCategory}`,
    );
    if (indicatorRef.current && selectedCategoryElement) {
      const { offsetLeft, offsetWidth } = selectedCategoryElement;
      indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
      indicatorRef.current.style.width = `${offsetWidth}px`;
    }
  }, [selectedCategory]);

  const products = {
    ximang: ["Sản phẩm xi măng 1", "Sản phẩm bộ trét 2"],
    gach: ["Gạch men", "Gạch ốp lát"],
    thep: ["Thép cuộn", "Sắt cây"],
    go: ["Gỗ thông", "Ván ép công nghiệp"],
  };

  const data = [
    "Xi măng, bộ trét",
    "Gạch",
    "Thép & Sắt",
    "Gỗ & ván ép",
    "Ống nước & phụ kiện",
    "Thiết bị điện",
    "Sơn",
    "Thiết bị vệ sinh",
    "Vật liệu cách nhiệt",
    "Dụng cụ xây dựng",
    "Phụ kiện khác",
  ];

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "ximang", name: "Xi măng, bộ trét" },
    { id: "gach", name: "Gạch" },
    { id: "thep", name: "Thép & Sắt" },
    { id: "go", name: "Gỗ & ván ép" },
    { id: "ongnuoc", name: "Ống nước & phụ kiện" },
    { id: "thietbidiens", name: "Thiết bị điện" },
    { id: "son", name: "Sơn" },
    { id: "thietbivesinh", name: "Thiết bị vệ sinh" },
    { id: "vatlieucachnhiet", name: "Vật liệu cách nhiệt" },
    { id: "dungcuxaydung", name: "Dụng cụ xây dựng" },
    { id: "phukienkhac", name: "Phụ kiện khác" },
  ];

  const getProductsToDisplay = () => {
    if (selectedCategory === "all") {
      return Object.values(products).flat();
    }
    return products[selectedCategory as keyof typeof products] || [];
  };

  return (
    <section className="container mx-auto">
      <div className="relative mt-28">
        <h3 className="text-center text-3xl font-bold text-primary lg:text-4xl">
          Sản phẩm VLXD
        </h3>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
          <div className="mt-2 flex w-[200px] items-center justify-center">
            <span className="h-px flex-grow bg-gray-300"></span>
            <span className="mx-2 text-gray-500">&#x2766;</span>
            <span className="h-px flex-grow bg-gray-300"></span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-20 max-w-[700px]">
        <div className="scroll relative flex flex-nowrap space-x-2 overflow-x-scroll px-2">
          <div
            ref={indicatorRef}
            className="absolute inset-0 z-[-1] mb-3 h-full rounded-md bg-primary transition-transform duration-500 ease-in-out"
          />
          {categories.map((category) => (
            <div
              key={category.id}
              id={`category-${category.id}`}
              className={`relative flex-shrink-0 cursor-pointer p-2 transition-colors duration-500 ${selectedCategory === category.id ? "text-white" : "text-black"}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {getProductsToDisplay().length > 0
          ? getProductsToDisplay().map((product: any, index: number) => (
              <ScrollReveal key={product?._id}>
                <div className="product-item my-5 cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-700 ease-in-out hover:shadow-lg">
                  <div className="flex h-96 flex-col items-center justify-center transition-all duration-700 ease-in-out">
                    <div className="group relative w-full overflow-hidden">
                      <Image
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2FXi%20m%C4%83ng.jpg?alt=media&token=4038617b-6820-4982-a912-9dffdffbf897"
                        }
                        width={1000}
                        height={100}
                        quality={100}
                        alt={product?.name}
                        className="h-full w-full object-contain p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
                      />

                      <button className="absolute bottom-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:transform group-hover:opacity-100">
                        <p className="text-md mx-5 border-2 p-2 font-semibold text-[#fff] hover:bg-[#fff] hover:text-black xl:text-lg">
                          <button>+ Thêm vào giỏ hàng</button>
                        </p>
                      </button>
                    </div>
                    <Link href={`/product/${product?._id}`}>
                      <div className="flex flex-col items-center p-4 text-center">
                        <h3 className="mb-2 text-lg font-semibold">
                          Xi măng INSEE
                        </h3>

                        <p className="mb-2 text-xl font-bold">
                          <span className="text-primary">123.000đ</span>
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="my-3 rounded-lg border-[0.2px] border-[#e6e6e6] p-5"
              >
                <Skeleton loading={true} active />
              </div>
            ))}
      </div>

      {getProductsToDisplay().length > 0 && (
        <div className="my-7 flex justify-center">
          <button className="w-[300px] border-2 border-primary bg-primary py-3 font-bold text-[white] transition-all duration-500 ease-in-out hover:rounded-2xl hover:border-primary hover:bg-[white] hover:tracking-widest hover:text-primary">
            Xem thêm {">"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductHome;
