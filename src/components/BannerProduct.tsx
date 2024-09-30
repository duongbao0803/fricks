import { Carousel } from "antd";
import React from "react";
import ImageSliderCustom from "./ImageSliderCustom";
import Slide1 from "@/assets/images/logo/banner.png";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiCoinInsert } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import Image from "next/image";
import IconWeb from "@/assets/images/logo/logo_web.png";

const BannerProduct = () => {
  const Process = [
    {
      icon: (
        <LiaShippingFastSolid className="size-12 rounded-full border border-[#fff] p-3 text-[#fff] md:size-14 lg:size-16" />
      ),
      name: "Miễn phí vận chuyển",
      title: "Cho bất kì đơn hàng",
    },
    {
      icon: (
        <CiCoinInsert className="size-12 rounded-full border border-[#fff] p-3 text-[#fff] md:size-14 lg:size-16" />
      ),
      name: "Tiết kiệm chi phí",
      title: "Cam kết giá ổn nhất thị trường",
    },
    {
      icon: (
        <BiSupport className="size-12 rounded-full border border-[#fff] p-3 text-[#fff] md:size-14 lg:size-16" />
      ),
      name: "Hỗ trợ kỹ thuật",
      title: "Chăm sóc khách hàng tận tình",
    },
  ];

  return (
    <section>
      <div className="relative h-[50vh] max-h-[992px] min-h-[200px] w-full overflow-hidden bg-[url('https://citc.edu.vn/wp-content/uploads/2020/02/do-dat-trac-dia.png')] bg-cover bg-no-repeat transition-all duration-500 lg:min-h-[450px]">
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="container absolute inset-0 mx-auto flex items-center justify-center">
          <div className="my-5 flex flex-col items-center justify-center overflow-hidden transition-all duration-500">
            <p className="mb-3 text-center text-2xl font-bold text-white md:text-3xl">
              Fricks
            </p>
            <h1 className="text-center text-3xl font-bold text-white md:text-5xl">
              Danh sách sản phẩm
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerProduct;
