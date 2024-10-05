"use client";
import React, { useState, useEffect } from "react";
import BannerProduct from "@/components/BannerProduct";
import VoiceSearch from "@/components/VoiceSearch";
import { Form, Skeleton } from "antd";
import { BreadScrumb, RadioCustom, SliderCustom } from "@/components/common"; // Đổi thành RadioCustom
import { useGetAllCatagoryQuery } from "@/apis/categortApi";
import { useGetProductListQuery } from "@/apis/productApi";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import Link from "next/link";
import { PriceFormat } from "@/utils";

const ProductPage = () => {
  const items = [
    {
      title: "Sản phẩm",
    },
  ];
  const { data: categoriesData = [], isLoading } = useGetAllCatagoryQuery(
    undefined,
    {},
  );

  const categories = [{ id: 100, name: "Tất cả" }, ...categoriesData];
  const [selectedCategory, setSelectedCategory] = useState(100);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: productData = [] } = useGetProductListQuery({
    categoryId: selectedCategory,
  });
  useEffect(() => {
    setSelectedCategory(100);
  }, []);

  const handleSearchUpdate = (query: string) => {
    setSearchQuery(query);
  };

  const handleRadioChange = (categoryName: number) => {
    setSelectedCategory(categoryName);
    return productData[selectedCategory as keyof typeof productData] || [];
  };

  const getProductsToDisplay = () => {
    if (selectedCategory === 100) {
      return Object.values(productData).flat();
    }
    console.log("check select", selectedCategory);
    console.log("check select", productData);

    return productData[selectedCategory as keyof typeof productData] || [];
  };

  const handleSliderChange = (categoryName: string) => {
    // setSelectedCategory(categoryName); // Cập nhật danh mục đã chọn
  };

  return (
    <main className="min-h-screen">
      <BannerProduct />
      <section className="container mx-auto">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <div className="grid grid-cols-4 gap-16 leading-10">
          <div className="col-span-1">
            <div>
              <p>Tìm kiếm</p>
              <div className="relative my-5 flex items-center gap-2 transition-all duration-500 lg:flex">
                <VoiceSearch onSearch={handleSearchUpdate} />
                <Form name="normal_login" className="login-form w-full">
                  <Form.Item
                    name=""
                    hasFeedback
                    colon={true}
                    className="formItem"
                    noStyle
                  >
                    <input
                      value={searchQuery}
                      placeholder="Tìm kiếm..."
                      type="email"
                      className="w-full rounded-lg border-2 px-3 py-2 text-sm focus:border-2 focus:!border-primary active:border-2 active:border-primary"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
            <p>Danh mục</p>
            <div>
              <SliderCustom
                min={0}
                max={1000000}
                initialValue={[20, 80]}
                onChange={handleSliderChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              {categories?.map((cate: any, index: number) => (
                <div key={index}>
                  <RadioCustom
                    title={cate?.name}
                    checked={selectedCategory === cate?.id}
                    onChange={() => handleRadioChange(cate?.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <div className="mx-auto mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {productData?.length > 0
                ? productData?.map((product: any, index: number) =>
                    product?.price?.map((item: any, index: number) => (
                      <ScrollReveal key={index}>
                        <div className="product-item my-5 cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-700 ease-in-out hover:shadow-lg">
                          <div className="flex h-96 flex-col items-center justify-center transition-all duration-700 ease-in-out">
                            <div className="group relative h-full w-full overflow-hidden">
                              <Image
                                src={product?.image ?? ""}
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
