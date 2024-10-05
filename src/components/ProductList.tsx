"use client";

import { useEffect, useMemo, useState } from "react";
import { Divider, Form, Skeleton, Select, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import VoiceSearch from "./VoiceSearch";
import ScrollReveal from "./ScrollReveal";
import { RadioCustom, SliderCustom } from "./common";
import notify from "./common/Notification";
import { PriceFormat } from "@/utils";
import { useGetAllCatagoryQuery } from "@/apis/categortApi";
import { useGetProductListQuery } from "@/apis/productApi";
import useDebounce from "@/hooks/useDebounce";
import NoProducts from "@/assets/images/logo/no-products.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleFavorite } from "@/redux/slices/favoriteSlice";
import { SortStatus } from "@/enums";

const { Option } = Select;

const ProductList = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 1000000]);
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const [selectedSort, setSelectedSort] = useState("default");
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(
    (state: RootState) => state.favorites.favoriteProducts,
  );

  const { data: categoriesData = [], isLoading } = useGetAllCatagoryQuery(
    undefined,
    {},
  );
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
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
        (a: any, b: any) => a.price[0].price - b.price[0].price,
      );
    } else if (selectedSort.includes(SortStatus.HIGHTOLOW)) {
      return [...productData].sort(
        (a: any, b: any) => b.price[0].price - a.price[0].price,
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
  const handleToggleFavorite = (product: any) => {
    dispatch(toggleFavorite(product?.id));
    const isFavorite = favoriteProducts.includes(product?.id);
    notify(
      "success",
      isFavorite
        ? `Gỡ ${product?.name} khỏi danh sách yêu thích thành công`
        : `Thêm ${product?.name} vào danh sách yêu thích thành công`,
      2,
    );
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
                name=""
                hasFeedback
                colon={true}
                className="formItem"
                noStyle
              >
                <input
                  value={searchQuery}
                  placeholder="Tìm kiếm..."
                  type="text"
                  className="w-full rounded-lg border-2 px-3 py-2 text-sm focus:border-2 focus:!border-primary active:border-2 active:border-primary"
                  onChange={(e) => handleSearchUpdate(e.target.value)}
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
            categories?.map((cate: any, index: number) => (
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
            className="w-1/4 md:w-1/6"
            onChange={handleSortChange}
          >
            <Option value="default">Mặc định</Option>
            <Option value="lowToHigh">Thấp đến cao</Option>
            <Option value="highToLow">Cao đến thấp</Option>
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
            sortProduct?.map((product: any) =>
              product?.price?.map((item: any, index: number) => (
                <ScrollReveal key={index}>
                  <div className="mx-auto my-5 max-w-[350px] cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-500 ease-in-out hover:shadow-lg sm:w-[260px] md:w-[260px]">
                    <div className="flex h-96 flex-col items-center justify-center transition-all duration-500">
                      <div className="group relative h-full w-full overflow-hidden transition-all duration-500">
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

                        <button
                          className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 transition-all duration-300 ease-in-out hover:bg-gray-200"
                          onClick={() => handleToggleFavorite(product)}
                        >
                          {favoriteProducts.includes(product?.id) ? (
                            <AiFillHeart className="text-xl text-red-500" />
                          ) : (
                            <AiOutlineHeart className="text-xl text-gray-500" />
                          )}
                        </button>
                      </div>
                      <Link href={`/product/${product?.id}`}>
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
          ) : (
            <div className="col-span-1 flex flex-grow items-center justify-center text-center text-lg font-bold text-gray-500 md:col-span-3">
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
