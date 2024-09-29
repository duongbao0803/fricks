"use client";
import { Card } from "antd";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

const PostHome = () => {
  const { Meta } = Card;

  return (
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
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1150: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1400: {
              slidesPerView: 2,
            },
            1500: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1900: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            2400: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            3300: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper h-[450px] overflow-hidden transition-all duration-500"
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide
              key={index}
              className="flex h-[300px] max-w-[500px] justify-center"
            >
              <Link href={""} className="gap-5 transition-all duration-500">
                <Card
                  hoverable
                  className="h-auto max-w-[500px] overflow-visible border-2"
                  cover={
                    <Image
                      alt="error"
                      height={300}
                      width={350}
                      quality={100}
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2FXi%20m%C4%83ng.jpg?alt=media&token=4038617b-6820-4982-a912-9dffdffbf897"
                      }
                      className="size-[300px] object-contain"
                    />
                  }
                >
                  <Meta
                    description={
                      <span className="block text-sm font-semibold text-[black]">
                        Nội dung tin tức hoặc mô tả Nội dung tin tức hoặc mô tả
                        Nội dung tin tức hoặc mô tả Nội dung tin tức hoặc mô tả
                        Nội dung tin tức hoặc mô tả
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
  );
};

export default PostHome;
