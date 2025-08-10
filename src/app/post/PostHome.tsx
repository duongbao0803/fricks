"use client";

import { useGetPostListQuery } from "@/apis/postApi";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { IoSparkles } from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const PostHome = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  const { data, isLoading } = useGetPostListQuery(
    {
      PageIndex: 1,
      PageSize: 100,
    },
    { skip: !inView },
  );

  const stripHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent?.slice(0, 100) + "..." || "";
  };

  return (
    <section className="container m-32 mx-auto px-4" ref={ref}>
      <div className="mb-14 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-thirdly px-3 py-2">
          <IoSparkles className="animate-pulse text-xl text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wide text-primary">
            Tin tức mới nhất
          </span>
        </div>
        <h1 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
          Tin tức
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 lg:text-base">
          Thông tin mới nhất về sản phẩm và các xu hướng trong ngành vật liệu
          xây dựng
        </p>
        <div className="mt-5 flex items-center justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <IoSparkles className="mx-4 text-lg text-primary" />
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
      </div>

      <Swiper
        freeMode
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 0 },
          780: { slidesPerView: 2, spaceBetween: 0 },
          900: { slidesPerView: 2, spaceBetween: 0 },
          1150: { slidesPerView: 3, spaceBetween: 0 },
          1600: { slidesPerView: 3, spaceBetween: 0 },
          2000: { slidesPerView: 4, spaceBetween: 0 },
        }}
        modules={[FreeMode, Autoplay]}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i} className="p-5">
                <div className="h-full w-full overflow-hidden rounded-2xl bg-white shadow-md">
                  <Skeleton.Image className="min-w-full" active />
                  <div className="space-y-3 p-6">
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </div>
                </div>
              </SwiperSlide>
            ))
          : data?.map((post: any) => (
              <SwiperSlide key={post.id} className="p-5">
                <Link
                  href={`/post/${post.id}`}
                  className="group block h-full transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-full overflow-hidden rounded-2xl bg-white shadow-md">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        height={200}
                        width={400}
                        quality={90}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    <div className="space-y-3 p-6">
                      <h3 className="line-clamp-2 text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-gray-600">
                        {stripHtml(post.content)}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            {new Date(post.createDate).toLocaleDateString()}
                          </span>
                        </span>
                        <span className="flex items-center gap-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
                          <span>Đọc thêm</span>
                          <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
};

export default PostHome;
