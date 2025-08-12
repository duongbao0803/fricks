"use client";

import {
  useAddFavoriteMutation,
  useGetFavorListQuery,
} from "@/apis/favoriteProductApi";
import useCart from "@/app/product/hooks/useCart";
import ProductGrid from "@/components/sections/product/ProductGrid";
import { showToast } from "@/hooks/useShowToast";
import { getToken } from "@/hooks/useToken";
import useUserInfo from "@/hooks/useUserInfo";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";

const RelatedProducts = ({ productData }: any) => {
  const { userInfo } = useUserInfo();
  const { handleAddToCart } = useCart();
  const token = getToken();

  const [addFavorite] = useAddFavoriteMutation();
  const { data: favoriteList = [] } = useGetFavorListQuery(
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

  const handleToggleFavorite = async (productId: number) => {
    if (!favorites[productId]) {
      const res = await addFavorite({ productId }).unwrap();
      if (res) {
        showToast(
          "success",
          `Đã thêm ${res?.productName} vào danh sách yêu thích`,
        );
        setFavorites((prev: any) => ({
          ...prev,
          [productId]: true,
        }));
      }
    }
  };

  return (
    <ProductGrid
      productData={productData}
      title="Sản phẩm liên quan"
      subtitle="Khám phá các sản phẩm liên quan với chất lượng và giá cả hợp lý"
      badgeText="Sản phẩm chất lượng cao"
      maxItems={5}
      userInfo={userInfo}
      favorites={favorites}
      showViewMoreButton={false}
      onAddToCart={handleAddToCart}
      onToggleFavorite={handleToggleFavorite}
      loading={!productData}
      skeletonCount={4}
      categories={[]}
    />
  );
};

export default RelatedProducts;
