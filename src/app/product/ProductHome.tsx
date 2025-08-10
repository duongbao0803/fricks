"use client";

import { useProductHome } from "@/app/product/hooks/useProductHome";
import NotFoundImage from "@/assets/images/logo/not-found.jpg";
import { ScrollReveal } from "@/components";
import { ProductInfo } from "@/types/product.types";
import { formatCurrency } from "@/utils";
import { Rate, Skeleton, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoChevronBack, IoChevronForward, IoSparkles } from "react-icons/io5";

const ProductHome = () => {
  const { handler, state, refs } = useProductHome();

  return (
    <section className="container mx-auto" ref={refs.ref}>
      <div className="mt-36 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-thirdly px-3 py-2">
          <IoSparkles className="animate-pulse text-xl text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wide text-primary">
            Sản phẩm chất lượng cao
          </span>
        </div>

        <h1 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
          Sản phẩm <span className="text-primary">VLXD</span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 lg:text-base">
          Khám phá bộ sưu tập vật liệu xây dựng chất lượng cao với giá cả cạnh
          tranh nhất
        </p>

        <div className="mt-5 flex items-center justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <IoSparkles className="mx-4 text-lg text-primary" />
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[700px]">
        <div className="mb-2 flex justify-center space-x-2 md:hidden">
          <button
            onClick={handler.scrollLeft}
            className={`rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
              state.canScrollLeft
                ? "text-primary hover:bg-primary hover:text-white"
                : "cursor-not-allowed text-gray-300"
            }`}
            disabled={!state.canScrollLeft}
          >
            <IoChevronBack className="text-xl" />
          </button>
          <button
            onClick={handler.scrollRight}
            className={`rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
              state.canScrollRight
                ? "text-primary hover:bg-primary hover:text-white"
                : "cursor-not-allowed text-gray-300"
            }`}
            disabled={!state.canScrollRight}
          >
            <IoChevronForward className="text-xl" />
          </button>
        </div>

        <div className="relative flex items-center">
          <button
            onClick={handler.scrollLeft}
            className={`absolute -left-10 top-1/2 z-10 hidden -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:block ${
              state.canScrollLeft
                ? "text-primary hover:bg-primary hover:text-white"
                : "cursor-not-allowed text-gray-300"
            }`}
            disabled={!state.canScrollLeft}
          >
            <IoChevronBack className="text-xl" />
          </button>

          <div className="overflow-hidden">
            <div
              ref={refs.scrollContainerRef}
              className="scroll scrollbar-hide relative flex flex-nowrap space-x-2 overflow-x-auto px-2"
              onScroll={handler.checkScrollPosition}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div
                ref={refs.indicatorRef}
                className="absolute inset-0 z-[-1] mb-3 h-full rounded-md bg-primary transition-transform duration-500 ease-in-out"
              />
              {state.categories.map((category, index) => (
                <div
                  key={index}
                  id={`category-${category.id}`}
                  className={`relative flex-shrink-0 cursor-pointer p-2 transition-colors duration-500 ${
                    state.selectedCategory === category.id
                      ? "text-white"
                      : "text-black"
                  }`}
                  onClick={() => handler.setSelectedCategory(category.id)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handler.scrollRight}
            className={`absolute -right-10 top-1/2 z-10 hidden -translate-y-1/2 translate-x-4 rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:block ${
              state.canScrollRight
                ? "text-primary hover:bg-primary hover:text-white"
                : "cursor-not-allowed text-gray-300"
            }`}
            disabled={!state.canScrollRight}
          >
            <IoChevronForward className="text-xl" />
          </button>
        </div>
      </div>

      <div className="mx-auto mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {state.productData && state.productData?.items?.length > 0
          ? state.productData?.items
              ?.slice(0, 8)
              .map((product: ProductInfo, index: number) => (
                <ScrollReveal key={index}>
                  <div className="relative my-5 cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-700 ease-in-out hover:shadow-lg">
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
                            <button
                              onClick={() => handler.handleAddToCart(product)}
                            >
                              + Thêm vào giỏ hàng
                            </button>
                          </p>
                        </button>
                        {state.userInfo && (
                          <Tooltip
                            title={
                              state.favorites[product.id]
                                ? "Đã có trong danh sách yêu thích"
                                : "Thêm vào danh sách yêu thích"
                            }
                            placement="top"
                          >
                            <button
                              className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 transition-all duration-500 hover:bg-gray-200"
                              onClick={() =>
                                handler.handleToggleFavorite(product?.id)
                              }
                              disabled={state.favorites[product.id]}
                            >
                              {state.favorites[product.id] ? (
                                <AiFillHeart className="text-xl text-red-500" />
                              ) : (
                                <AiOutlineHeart className="text-xl text-gray-500" />
                              )}
                            </button>
                          </Tooltip>
                        )}
                      </div>
                      <Link href={`/product/${product?.id}`}>
                        <div className="flex flex-col items-center p-4 text-center">
                          <h3 className="mb-2 text-lg">{product?.name}</h3>
                          <Rate
                            disabled
                            value={product?.rating || 5}
                            className="mb-2 text-sm"
                          />
                          <p className="mb-2 text-xl font-bold">
                            <span className="text-primary">
                              {formatCurrency(product?.price[0]?.price)} /{" "}
                              {product?.price[0]?.unit?.name || ""}
                            </span>
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 transform">
                      <p className="text-[12px] font-normal text-gray-400">
                        {product?.storeName}
                      </p>
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

      {state.productData && state.productData?.items?.length > 0 && (
        <div className="my-7 flex justify-center">
          <button
            onClick={() => handler.router.push("/product")}
            type="submit"
            className="button-hire__custom !w-[300px] border-2 border-primary !py-3 text-lg font-semibold transition-all duration-700 ease-in-out hover:rounded-2xl hover:border-2 hover:font-bold hover:text-primary"
          >
            Xem thêm {">"}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductHome;
