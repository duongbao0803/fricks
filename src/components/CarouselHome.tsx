import { Carousel } from "antd";
import React from "react";
import ImageSliderCustom from "./ImageSliderCustom";
import Slide1 from "@/assets/images/logo/banner.png";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiCoinInsert } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";

const CarouselHome = () => {
  const Process = [
    {
      icon: (
        <LiaShippingFastSolid className="size-14 rounded-full border border-[#fff] p-3 text-[#fff] sm:size-16 md:size-14 lg:size-16" />
      ),
      name: "Miễn phí vận chuyển",
      title: "Cho bất kì đơn hàng",
    },
    {
      icon: (
        <CiCoinInsert className="size-14 rounded-full border border-[#fff] p-3 text-[#fff] sm:size-16 md:size-14 lg:size-16" />
      ),
      name: "Tiết kiệm chi phí",
      title: "Cam kết giá ổn nhất thị trường",
    },
    {
      icon: (
        <BiSupport className="size-14 rounded-full border border-[#fff] p-3 text-[#fff] sm:size-16 md:size-14 lg:size-16" />
      ),
      name: "Hỗ trợ kỹ thuật",
      title: "Chăm sóc khách hàng tận tình",
    },
  ];

  return (
    <section>
      <div className="relative max-h-[500px] w-full bg-[orange]">
        <div>
          <Carousel autoplay className="select-none rounded-xl">
            <ImageSliderCustom
              src={Slide1}
              alt="slide1"
              width={3000}
              height={3000}
              quality={100}
              className="h-[500px] w-full object-fill"
            />
            <ImageSliderCustom
              src={Slide1}
              alt="slide1"
              width={3000}
              height={3000}
              quality={100}
              className="h-[500px] w-full object-fill"
            />
            <ImageSliderCustom
              src={Slide1}
              alt="slide1"
              width={3000}
              height={3000}
              quality={100}
              className="h-[500px] w-full object-fill"
            />
          </Carousel>
        </div>
        <div className="absolute bottom-[-50px] left-1/2 z-[99] mx-auto my-auto flex h-[100px] w-full max-w-[300px] -translate-x-1/2 transform items-center justify-between overflow-hidden rounded-lg border border-primary bg-primary/95 px-3 transition-all duration-500 sm:bottom-[-40px] sm:w-full sm:max-w-[400px] md:bottom-[-30px] md:w-full md:max-w-[700px] lg:bottom-[-50px] lg:w-full lg:max-w-[900px]">
          <div className="flex w-full items-center justify-around overflow-hidden transition-all duration-500 md:justify-between">
            {Process.map((item, index: number) => (
              <div
                className="flex items-center justify-between gap-2 transition-all duration-500"
                key={index}
              >
                <div>{item.icon}</div>
                <div className="hidden flex-col gap-3 transition-all duration-500 md:flex">
                  <p className="text-[11px] font-bold text-[#fff] transition-all duration-500 lg:text-sm xl:text-sm">
                    {item.name}
                  </p>
                  <p className="text-[10px] font-light text-white transition-all duration-500 lg:text-sm xl:text-sm">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselHome;
