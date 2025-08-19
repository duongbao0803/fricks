"use client";

import { useGetFavorListQuery } from "@/apis/favoriteProductApi";
import {
  useGetDetailProductQuery,
  useGetProductListQuery,
} from "@/apis/productApi";
import { useGetStoreDetailQuery } from "@/apis/storeApi";
import Imagee from "@/assets/images/logo/avatar_admin.jpg";
import FeedbackSection from "@/components/sections/feedback";
import RelatedProducts from "@/components/sections/product/RelatedProducts";
import StoreInfoModal from "@/components/sections/product/StoreInfoModal";
import { showToast } from "@/hooks/useShowToast";
import { getToken } from "@/hooks/useToken";
import { ProductInfo } from "@/types/product.types";
import { formatCurrency } from "@/utils";
import { skipToken } from "@reduxjs/toolkit/query";
import { Divider, Rate, Spin, Tabs } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import useCart from "../hooks/useCart";

const Detail = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [productDetail, setProductDetail] = useState<any>(null);
  const [selectedUnit, setSelectedUnit] = useState<{
    name: string;
    price: number;
    productUnitId: number;
  } | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const { data: product, isLoading } = useGetDetailProductQuery({
    productId: id,
  });

  useEffect(() => {
    if (product) {
      setProductDetail(product);
      if (product?.price?.length > 0) {
        setSelectedUnit({
          name: product.price[0].unit.name,
          price: product.price[0].price,
          productUnitId: product.price[0].unit.id,
        });
      }
    }
  }, [product]);

  const { data: productData } = useGetProductListQuery(
    {
      PageIndex: 1,
      PageSize: 10,
      CategoryId: productDetail?.categoryId,
      name: "",
      MinPrice: 0,
      MaxPrice: 0,
      StoreId: 0,
    },
    { skip: !productDetail?.categoryId },
  );

  const { data: store } = useGetStoreDetailQuery(
    {
      storeId: productDetail?.storeId,
    },
    {
      skip: !productDetail?.storeId,
    },
  );
  const typedProduct = productDetail as ProductInfo;
  const { TabPane } = Tabs;

  const { handleAddToCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) setQuantity(newQuantity);
  };

  const handleAddToCartWithQuantity = () => {
    if (selectedUnit) {
      handleAddToCart(typedProduct, quantity, selectedUnit);
    } else {
      showToast("error", "Vui lòng chọn đơn vị trước khi thêm vào giỏ hàng");
    }
  };

  const handleChangeUnit = (priceItem: {
    unit: { name: string; id: number };
    price: number;
  }) => {
    setSelectedUnit({
      name: priceItem?.unit?.name,
      price: priceItem?.price,
      productUnitId: priceItem?.unit?.id,
    });
  };

  const token = getToken();

  const { data: favoriteList = [], refetch } = useGetFavorListQuery(
    token ? { PageIndex: 1, PageSize: 50 } : skipToken,
  );
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [prevFavoriteList, setPrevFavoriteList] = useState([]);

  useEffect(() => {
    if (JSON.stringify(prevFavoriteList) !== JSON.stringify(favoriteList)) {
      const initialFavorites = favoriteList.reduce(
        (
          acc: { [x: string]: boolean },
          favorite: { productId: string | number },
        ) => {
          acc[favorite.productId] = true;
          return acc;
        },
        {},
      );
      setFavorites(initialFavorites);
      setPrevFavoriteList(favoriteList);
    }
  }, [favoriteList, prevFavoriteList]);

  return (
    <div className="container mx-auto bg-white p-6">
      {isLoading ? (
        <Spin size="large" tip="Đang chờ..." fullscreen />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Image
                src={typedProduct?.image}
                height={2000}
                width={2000}
                quality={100}
                alt="sản phẩm"
                className="max-h-[400px] w-full rounded-lg object-contain transition-opacity duration-300"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-700">
                {typedProduct?.name}
              </h2>
              <div className="mt-2 items-center">
                <div className="my-2 flex">
                  <Rate
                    disabled
                    value={typedProduct?.rate ?? 5}
                    className="mb-2 text-sm"
                  />
                  <span className="ml-2 text-gray-400">
                    {typedProduct?.rate}/5
                  </span>
                </div>
                <p className="text-[16px] text-gray-500">
                  Thương hiệu:{" "}
                  <span className="text-primary">
                    {typedProduct?.brand?.name}
                  </span>
                </p>
              </div>
              <p className="my-5 text-3xl font-bold text-primary">
                {selectedUnit
                  ? formatCurrency(selectedUnit.price)
                  : "Chọn đơn vị"}
              </p>

              <div className="mt-4 flex gap-2">
                {typedProduct?.price?.map((priceItem, index) => (
                  <button
                    key={index}
                    onClick={() => handleChangeUnit(priceItem)}
                    className={`rounded-md border px-4 py-1 transition-all duration-200 ${
                      selectedUnit?.name === priceItem.unit.name
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {priceItem.unit.name}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center border border-gray-300">
                  <button
                    className="px-4 py-2.5 text-gray-500"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number(e.target.value))
                    }
                    className="w-12 border-l border-r border-gray-300 text-center outline-none"
                  />
                  <button
                    className="px-4 py-2.5 text-gray-500"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCartWithQuantity}
                  type="submit"
                  className="button-hire__custom !w-48 border border-primary border-transparent !py-2.5 font-normal hover:border hover:font-bold hover:text-primary"
                >
                  + Thêm giỏ hàng
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>

              <div className="mt-6 rounded-md border border-gray-500 p-4">
                <h3 className="mb-2 font-semibold text-gray-700">
                  CHÍNH SÁCH BÁN HÀNG
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">&#128663;</span> Miễn phí vận chuyển
                    (Nội thành HCM)
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="ml-1 mr-3.5">&#8635;</span> Hoàn trả miễn
                    phí (Trong vòng 24h)
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">&#128179;</span> Thanh toán (Chuyển
                    khoản/COD)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="my-10">
            <Divider className="!m-3 bg-gray-200" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={store?.image || Imagee}
                  height={50}
                  width={50}
                  quality={100}
                  alt="avatar-store"
                  className="size-[50px] rounded-[100%]"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm">{productData?.items[0]?.storeName}</p>
                  <p className="text-[12px] text-gray-400">
                    Online 8 tiếng trước
                  </p>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="border border-primary bg-white py-1 text-[12px] text-primary transition-all duration-500 hover:bg-primary hover:text-white"
                  >
                    Xem cửa hàng
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <a href="mailto:fricks.customerservice@gmail.com">
                  <AiOutlineMessage size={30} className="text-primary" />
                </a>
              </div>
            </div>
            <Divider className="!m-3 bg-gray-200" />
          </div>

          <div className="mt-8">
            <Tabs defaultActiveKey="1" className="border-gray-200">
              <TabPane tab="CHI TIẾT" key="1">
                <div className="text-gray-700">
                  <h4 className="mb-2 font-semibold">{typedProduct?.name}</h4>
                  <p className="mb-2">{typedProduct?.description}</p>
                </div>
              </TabPane>
              <TabPane tab="ĐÁNH GIÁ" key="4">
                <FeedbackSection productId={Number(id)} />
              </TabPane>
            </Tabs>
          </div>
          <div className="mb-10">
            <RelatedProducts productData={productData} />
          </div>
        </>
      )}
      <StoreInfoModal store={store} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Detail;
