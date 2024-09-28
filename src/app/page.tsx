/* eslint-disable react/jsx-no-duplicate-props */
"use client";
import { ImageSliderCustom } from "@/components";
import Slide1 from "@/assets/images/slides/slide_1.jpg";
import { Card, Carousel, Divider, Skeleton } from "antd";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiCoinInsert } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import "./globals.css";

import Link from "next/link";
import Image from "next/image";
import Product from "@/assets/images/logo/product.jpg";
import { TiTick } from "react-icons/ti";
import { ButtonCustom } from "@/components/ui/button";
import { FaCartPlus, FaUser } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdFavorite, MdProductionQuantityLimits } from "react-icons/md";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "./globals.css";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { Meta } = Card;

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

  const products = {
    ximang: ["Sản phẩm xi măng 1", "Sản phẩm bộ trét 2"],
    gach: ["Gạch men", "Gạch ốp lát"],
    thep: ["Thép cuộn", "Sắt cây"],
    go: ["Gỗ thông", "Ván ép công nghiệp"],
  };

  const getProductsToDisplay = () => {
    if (selectedCategory === "all") {
      return Object.values(products).flat();
    }
    return products[selectedCategory] || [];
  };

  const stats = [
    {
      id: 1,
      value: <CountUp end={500} duration={3} delay={1.5} />,
      label: "SẢN PHẨM",
      icon: <MdProductionQuantityLimits />,
    },
    {
      id: 2,
      value: <CountUp end={1500} duration={3} delay={1.5} />,
      label: "KHÁCH HÀNG",
      icon: <FaUser />,
    },
    {
      id: 3,
      value: <CountUp end={250} duration={3} delay={1.5} />,
      label: "ĐỐI TÁC",
      icon: <FaPeopleGroup />,
    },
    {
      id: 4,
      value: <CountUp end={1900} duration={3} delay={1.5} />,
      label: "HẢI LÒNG",
      icon: <MdFavorite />,
    },
  ];

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
    <main className="min-h-screen">
      <section>
        <div className="relative max-h-[500px] w-full bg-[orange]">
          <div>
            <Carousel autoplay className="select-none rounded-xl">
              <ImageSliderCustom
                src={Slide1}
                alt="slide1"
                width={1000}
                height={1000}
                quality={100}
                className="h-[500px] w-full"
              />
              <ImageSliderCustom
                src={Slide1}
                alt="slide1"
                width={1000}
                height={1000}
                quality={100}
                className="h-[500px] w-full"
              />
              <ImageSliderCustom
                src={Slide1}
                alt="slide1"
                width={1000}
                height={1000}
                quality={100}
                className="h-[500px] w-full"
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
                            {product?.name}
                          </h3>

                          <p className="mb-2 text-xl font-bold">
                            <span className="text-primary">123</span>
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

      <ScrollReveal>
        <section className="container mx-auto my-32 transition-all duration-500">
          <div className="block flex-1 gap-5 transition-all duration-500 md:flex">
            <Image
              alt="logo"
              src={Product}
              height={700}
              width={700}
              quality={100}
              className="transition-all duration-500"
            />
            <div className="leading-8 transition-all duration-500">
              <h1 className="text-4xl font-medium">Sản phẩm chất lượng</h1>
              <p className="my-5 text-black/50">
                Báo giá cập nhật 24/7 tại nhà máy sản suất. Hỗ trợ vận chuyển
                thép tới tận công trình
              </p>
              <div className="leading-10">
                <div className="flex items-center">
                  <TiTick size={30} color="orange" />{" "}
                  <span className="text-black/50">
                    {" "}
                    Cam kết hàng chính hãng{" "}
                  </span>
                </div>
                <div className="flex items-center">
                  <TiTick size={30} color="orange" />{" "}
                  <span className="text-black/50">
                    {" "}
                    Cam kết hàng chính hãng{" "}
                  </span>
                </div>
                <div className="flex items-center">
                  <TiTick size={30} color="orange" />{" "}
                  <span className="text-black/50">Đổi trả linh động</span>
                </div>
              </div>

              <button className="group relative my-5 flex h-[2.8em] cursor-pointer items-center overflow-hidden rounded-3xl border border-solid bg-primary p-[0.35em] pl-[1em] pr-[3.3em] text-[17px] font-medium tracking-wider text-black">
                <span className="text-sm text-white">Đặt hàng ngay</span>
                <div className="absolute right-[0.3em] ml-[1em] flex size-[2.2em] items-center justify-center overflow-hidden rounded-3xl bg-white transition-all duration-300 group-hover:w-[calc(100%-0.6em)] active:group-active:scale-95">
                  <svg
                    className="w-[1.1em] text-[orange] transition-transform duration-300 group-hover:translate-x-[0.1em] group-hover:scale-110 group-hover:transform group-hover:text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 6L13 8L17 4M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                        stroke-width="2"
                        stroke="#ff7b29"
                        stroke-linecap="orange"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="my-32">
          <div className="relative h-full max-h-[992px] overflow-hidden bg-[url('https://drh.vn/FileUpload/Images/bg15_1.jpg')] bg-cover bg-center lg:h-[400px]">
            <div className="absolute inset-0 bg-black opacity-40" />
            <div className="relative grid h-full grid-cols-1 items-center justify-around gap-y-10 p-5 px-4 text-white sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="mb-4 flex flex-col items-center md:mb-0"
                >
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary md:h-20 md:w-20 lg:h-28 lg:w-28">
                    <span className="text-4xl md:text-3xl lg:text-5xl">
                      {stat.icon}
                    </span>
                  </div>

                  <h3 className="mt-2 text-3xl font-bold md:text-4xl">
                    {stat.value}
                  </h3>
                  <p className="text-sm md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="container mx-auto my-32 text-center">
          <div className="relative mt-20">
            <h3 className="text-center text-3xl font-bold text-primary lg:text-4xl">
              Tin tức
            </h3>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
              <div className="mt-2 flex w-[100px] items-center justify-center">
                <span className="h-px flex-grow bg-gray-300"></span>
                <span className="mx-2 text-gray-500">&#x2766;</span>
                <span className="h-px flex-grow bg-gray-300"></span>
              </div>
            </div>
          </div>

          <div className="my-10 flex justify-center">
            <Swiper
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                900: {
                  slidesPerView: 2,
                },
                1150: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 3,
                },
                1400: {
                  slidesPerView: 4,
                },
                1500: {
                  slidesPerView: 4,
                },
                1900: {
                  slidesPerView: 4,
                },
                2400: {
                  slidesPerView: 5,
                },
                3300: {
                  slidesPerView: 6,
                },
              }}
              modules={[FreeMode, Pagination, Autoplay]}
              className="mySwiper h-[500px] overflow-hidden transition-all duration-500"
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={""}
                    className="flex justify-center gap-5 transition-all duration-500"
                  >
                    <Card
                      hoverable
                      className="w-[250px] border-2"
                      cover={
                        <Image
                          alt="error"
                          height={1000}
                          width={1000}
                          quality={100}
                          src={
                            "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2FXi%20m%C4%83ng.jpg?alt=media&token=4038617b-6820-4982-a912-9dffdffbf897"
                          }
                        />
                      }
                    >
                      <Meta
                        description={
                          <span className="text-sm font-semibold text-[black]">
                            hihi
                          </span>
                        }
                      />
                    </Card>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mt-10">
          <div className="relative h-[50vh] max-h-[992px] min-h-[100px] overflow-hidden bg-[url('https://cdn.pixabay.com/photo/2017/02/15/07/42/brick-walls-2067815_1280.jpg')] bg-cover bg-center transition-all duration-500 lg:h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center lg:translate-x-52">
              <div className="h-[50vh] max-h-[300px] w-[90vw] max-w-[600px] border-4 border-white bg-white/60 transition-all duration-500">
                <p></p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
