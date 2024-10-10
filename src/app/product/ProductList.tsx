"use client";

import { useEffect, useMemo, useState } from "react";
import { Divider, Form, Skeleton, Select, Spin, Tooltip, Rate } from "antd";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { PriceFormat } from "@/utils";
import { useGetAllCatagoryQuery } from "@/apis/categortApi";
import { useGetProductListQuery } from "@/apis/productApi";
import useDebounce from "@/hooks/useDebounce";
import NoProducts from "@/assets/images/logo/no-products.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SortStatus } from "@/enums";
import { Category, ProductInfo, ProductPrice } from "@/types/product.types";
import { ScrollReveal, VoiceSearch } from "@/components";
import { notify } from "@/components/common/Notification";
import { RadioCustom, SliderCustom } from "@/components/common";
import { useGetFavorListQuery } from "@/apis/favoriteProductApi";
import { useFavorite } from "@/hooks/useAddFavorite";

const { Option } = Select;

const ProductList = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 1000000]);
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const [selectedSort, setSelectedSort] = useState<string>("default");
  const dispatch = useDispatch();
  const { isFavorite, toggleFavorite, loading } = useFavorite();

  const { data: favoriteList = [] } = useGetFavorListQuery(undefined, {});
  const { data: categoriesData = [], isLoading } = useGetAllCatagoryQuery(
    undefined,
    {},
  );
  console.log("check favoriteList", favoriteList);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const categories = useMemo(
    () => [{ id: 0, name: "Tất cả" }, ...categoriesData],
    [categoriesData],
  );

  const { data: productData = [], isFetching } = useGetProductListQuery({
    PageIndex: 1,
    PageSize: 10,
    CategoryId: selectedCategory,
    name: debouncedSearchQuery,
    MinPrice: debouncedPriceRange[0],
    MaxPrice: debouncedPriceRange[1],
  });

  useEffect(() => {
    setSelectedCategory(0);
  }, []);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };

  const sortProduct = useMemo(() => {
    if (selectedSort.includes(SortStatus.LOWTOHIGHT)) {
      return [...productData].sort(
        (a: ProductInfo, b: ProductInfo) =>
          a?.price[0]?.price - b?.price[0]?.price,
      );
    } else if (selectedSort.includes(SortStatus.HIGHTOLOW)) {
      return [...productData].sort(
        (a: ProductInfo, b: ProductInfo) =>
          b?.price[0]?.price - a?.price[0]?.price,
      );
    } else {
      return productData;
    }
  }, [productData, selectedSort]);

  const handleSearchUpdate = (query: string) => {
    setSearchQuery(query);
  };

  const handleRadioChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleSliderChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const handleToggleFavorite = (product: ProductInfo, item: ProductPrice) => {
    toggleFavorite(product?.id);
  };

  return (
    <section className="grid grid-cols-1 gap-16 leading-10 transition-all duration-500 md:grid-cols-4">
      <div className="transition-all duration-500 md:col-span-1">
        <div>
          <p className="font-medium">Tìm kiếm</p>
          <div className="relative my-5 flex items-center gap-2 transition-all duration-500 lg:flex">
            <VoiceSearch onSearch={handleSearchUpdate} />
            <Form name="normal_login" className="login-form w-full">
              <Form.Item
                name="name"
                hasFeedback
                colon={true}
                className="formItem"
                noStyle
              >
                <input
                  value={debouncedSearchQuery}
                  placeholder="Tìm kiếm..."
                  type="text"
                  className="w-full rounded-lg px-3 py-2 text-sm ring-1 ring-gray-300 focus:border-0 focus:outline-none focus:ring-1 focus:ring-primary"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
        <p className="font-medium">Danh mục</p>
        <div>
          <SliderCustom
            min={1}
            max={1000000}
            initialValue={[1, 1000000]}
            onChange={handleSliderChange}
          />
        </div>
        <Divider />
        <div className="flow-row flex flex-wrap gap-2 transition-all duration-500 sm:flex-col">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spin size="large" tip="Đang chờ..." />
            </div>
          ) : (
            categories?.map((cate: Category, index: number) => (
              <div key={index}>
                <RadioCustom
                  title={cate?.name}
                  checked={selectedCategory === cate?.id}
                  onChange={() => handleRadioChange(cate?.id)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="col-span-1 transition-all duration-500 md:col-span-3">
        <div className="mb-4 flex justify-end">
          <Select
            defaultValue="default"
            className="w-[30%] md:w-1/6"
            onChange={handleSortChange}
          >
            <Option value="default">Mặc định</Option>
            <Option value={SortStatus.LOWTOHIGHT}>Thấp đến cao</Option>
            <Option value={SortStatus.HIGHTOLOW}>Cao đến thấp</Option>
          </Select>
        </div>
        <div className="mx-auto mt-4 grid grid-cols-1 justify-center transition-all duration-500 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="my-3 mr-4 rounded-lg border-[0.2px] border-[#e6e6e6] p-5"
              >
                <Skeleton loading={true} active />
              </div>
            ))
          ) : sortProduct?.length > 0 ? (
            sortProduct?.map((product: ProductInfo) =>
              product?.price?.map((item: ProductPrice, index: number) => (
                <ScrollReveal key={index}>
                  <div className="relative mx-auto my-5 h-[400px] max-w-[350px] cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-500 ease-in-out hover:shadow-lg sm:w-[260px] md:w-[260px]">
                    <div className="relative flex h-96 flex-col items-center justify-center transition-all duration-500">
                      <div className="group relative h-full w-full overflow-hidden transition-all duration-500">
                        <Image
                          src={product?.image ?? ""}
                          width={1000}
                          height={1000}
                          quality={100}
                          alt="product"
                          className="h-full w-full object-contain p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
                        />
                        <button className="absolute bottom-0 flex h-full w-full cursor-default items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:transform group-hover:opacity-100">
                          <p className="mx-5 cursor-pointer border-2 p-2 text-[16px] font-semibold text-[#fff] hover:bg-[#fff] hover:text-black xl:text-lg">
                            <button>+ Thêm vào giỏ hàng</button>
                          </p>
                        </button>
                        <Tooltip
                          title={
                            isFavorite
                              ? "Thêm vào danh sách yêu thích"
                              : "Gỡ khỏi danh sách yêu thích"
                          }
                          placement="top"
                        >
                          <button
                            className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 transition-all duration-300 ease-in-out hover:bg-gray-200"
                            onClick={() => handleToggleFavorite(product, item)}
                          >
                            {favoriteList.includes(item?.id) ? (
                              <AiFillHeart className="text-xl text-red-500" />
                            ) : (
                              <AiOutlineHeart className="text-xl text-gray-500" />
                            )}
                          </button>
                        </Tooltip>
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
                              {PriceFormat.format(item?.price)} / {""}
                              {item?.unit?.name || ""}
                            </span>
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
                      <p className="text-[12px] font-normal text-gray-400">
                        {product?.storeName}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )),
            )
          ) : (
            <div className="col-span-1 grid place-items-center text-center text-lg font-bold text-gray-500 md:col-span-3">
              <Image
                alt="error"
                src={NoProducts}
                width={500}
                height={500}
                quality={100}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
