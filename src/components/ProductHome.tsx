"use client";
import { Skeleton } from "antd";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import Link from "next/link";
import { useGetAllCatagoryQuery } from "@/apis/categortApi";
import { useGetProductListQuery } from "@/apis/productApi";
import NotFoundImage from "@/assets/images/logo/not-found.jpg";
import { PriceFormat } from "@/utils";

const ProductHome = () => {
  const [selectedCategory, setSelectedCategory] = useState(100);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { data: categoriesData = [], isLoading } = useGetAllCatagoryQuery(
    undefined,
    {},
  );
  const { data: productData = [] } = useGetProductListQuery({
    categoryId: selectedCategory,
  });

  const categories = [{ id: 100, name: "Tất cả" }, ...categoriesData];

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

  const getProductsToDisplay = () => {
    if (selectedCategory === 100) {
      return Object.values(productData).flat();
    }
    console.log("check select", selectedCategory);
    console.log("check select", productData);

    return productData[selectedCategory as keyof typeof productData] || [];
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
          {categories.map((category, index) => (
            <div
              key={index}
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
        {productData?.length > 0
          ? productData?.map((product: any, index: number) =>
              product?.price?.map((item: any, index: number) => (
                <ScrollReveal key={index}>
                  <div className="product-item my-5 cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-700 ease-in-out hover:shadow-lg">
                    <div className="flex h-96 flex-col items-center justify-center transition-all duration-700 ease-in-out">
                      <div className="group relative h-full w-full overflow-hidden">
                        <Image
                          src={product?.image ?? NotFoundImage}
                          width={1000}
                          height={1000}
                          quality={100}
                          alt="product"
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
                            {product?.name}
                          </h3>

                          <p className="mb-2 text-xl font-bold">
                            <span className="text-primary">
                              {PriceFormat.format(item?.price)}
                            </span>
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              )),
            )
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
