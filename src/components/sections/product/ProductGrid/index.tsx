"use client";

import NotFoundImage from "@/assets/images/logo/not-found.jpg";
import { ScrollReveal } from "@/components";
import SelectCateScrollbar from "@/components/sections/product/SelectCateScrollbar";
import {
  ProductGridProps,
  ProductInfo,
  ProductPrice,
} from "@/types/product.types";
import { formatCurrency } from "@/utils";
import { Rate, Skeleton, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoSparkles } from "react-icons/io5";

const ProductGrid: React.FC<ProductGridProps> = ({
  productData,
  title,
  subtitle,
  badgeText,
  maxItems = 8,
  userInfo,
  favorites = {},
  showViewMoreButton = false,
  viewMoreHref = "/product",
  viewMoreText = "Xem thêm",
  onAddToCart,
  onToggleFavorite,
  loading = false,
  skeletonCount = 4,
  scrollLeft,
  canScrollLeft,
  scrollRight,
  canScrollRight,
  categories,
  selectedCategory,
  setSelectedCategory,
  indicatorRef,
  scrollContainerRef,
  checkScrollPosition,
}) => {
  return (
    <>
      <div className="mt-36 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-thirdly px-3 py-2">
          <IoSparkles className="animate-pulse text-xl text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-wide text-primary">
            {badgeText}
          </span>
        </div>

        <h1 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
          {title === "Sản phẩm VLXD" ? (
            <>
              Sản phẩm <span className="text-primary">VLXD</span>
            </>
          ) : title === "Sản phẩm liên quan" ? (
            <>
              Sản phẩm <span className="text-primary">liên quan</span>
            </>
          ) : (
            title
          )}
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 lg:text-base">
          {subtitle}
        </p>

        <div className="mt-5 flex items-center justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <IoSparkles className="mx-4 text-lg text-primary" />
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
      </div>

      {showViewMoreButton && (
        <SelectCateScrollbar
          scrollLeft={scrollLeft}
          canScrollLeft={canScrollLeft}
          scrollRight={scrollRight}
          canScrollRight={canScrollRight}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          indicatorRef={indicatorRef}
          scrollContainerRef={scrollContainerRef}
          checkScrollPosition={checkScrollPosition}
        />
      )}

      <div className="mx-auto mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {productData && productData?.items?.length > 0 && !loading
          ? productData?.items?.slice(1, maxItems).map((product: ProductInfo) =>
              product?.price?.map((item: ProductPrice, index: number) => {
                const defaultUnit = {
                  name: item?.unit?.name,
                  price: item?.price,
                  productUnitId: item?.unitId,
                };

                return (
                  <ScrollReveal key={`${product.id}-${index}`}>
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
                                onClick={() =>
                                  onAddToCart(product, 1, defaultUnit)
                                }
                              >
                                + Thêm vào giỏ hàng
                              </button>
                            </p>
                          </button>

                          {userInfo && onToggleFavorite && (
                            <Tooltip
                              title={
                                favorites[product.id]
                                  ? "Đã có trong danh sách yêu thích"
                                  : "Thêm vào danh sách yêu thích"
                              }
                              placement="top"
                            >
                              <button
                                className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 transition-all duration-500 hover:bg-gray-200"
                                onClick={() => onToggleFavorite(product?.id)}
                                disabled={favorites[product.id]}
                              >
                                {favorites[product.id] ? (
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
                              value={product?.rate || 5}
                              className="mb-2 text-sm"
                            />
                            <p className="mb-2 text-xl font-bold">
                              <span className="text-primary">
                                {formatCurrency(item?.price)} /{" "}
                                {item?.unit?.name}
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
                );
              }),
            )
          : Array.from({ length: skeletonCount }).map((_, index) => (
              <div
                key={index}
                className="my-3 rounded-lg border-[0.2px] border-[#e6e6e6] p-5"
              >
                <Skeleton loading={true} active />
              </div>
            ))}
      </div>

      {showViewMoreButton && productData && productData?.items?.length > 0 && (
        <div className="my-7 flex justify-center">
          <Link
            href={viewMoreHref}
            type="submit"
            className="button-hire__custom !w-[300px] border-2 border-primary !py-3 text-lg font-semibold transition-all duration-700 ease-in-out hover:rounded-2xl hover:border-2 hover:font-bold hover:text-primary"
          >
            {viewMoreText} {">"}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
