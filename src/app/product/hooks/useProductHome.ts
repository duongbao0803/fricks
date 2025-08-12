import { useGetAllCatagoryQuery } from "@/apis/categortApi";
import {
  useAddFavoriteMutation,
  useGetFavorListQuery,
} from "@/apis/favoriteProductApi";
import { useGetProductListQuery } from "@/apis/productApi";
import useCart from "@/app/product/hooks/useCart";
import { showToast } from "@/hooks/useShowToast";
import useUserInfo from "@/hooks/useUserInfo";
import { skipToken } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const useProductHome = () => {
  const { userInfo } = useUserInfo();
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const { ref, inView } = useInView({ triggerOnce: true });

  const [selectedCategory, setSelectedCategory] = useState(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const prevFavoriteListRef = useRef<any[]>([]);

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCatagoryQuery(undefined, { skip: !inView });

  const { handleAddToCart } = useCart();
  const [addFavorite] = useAddFavoriteMutation();

  const { data: favoriteList = [], refetch } = useGetFavorListQuery(
    token && inView ? { PageIndex: 1, PageSize: 50 } : skipToken,
  );

  const { data: productData } = useGetProductListQuery(
    {
      PageIndex: 1,
      PageSize: 10,
      CategoryId: selectedCategory,
      name: "",
      MinPrice: 0,
      MaxPrice: 0,
      StoreId: 0,
    },
    { skip: !inView },
  );

  const categories = useMemo(() => {
    const list = Array.isArray(categoriesData) ? categoriesData : [];
    return [{ id: 0, name: "Tất cả" }, ...list];
  }, [categoriesData]);

  const checkScrollPosition = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  const scrollLeft = useCallback(() => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  }, []);

  const scrollRight = useCallback(() => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  }, []);

  const handleToggleFavorite = useCallback(
    async (productId: number) => {
      if (!favorites[productId]) {
        const res = await addFavorite({ productId }).unwrap();
        if (res) {
          showToast(
            "success",
            `Đã thêm ${res?.productName} vào danh sách yêu thích`,
          );
          setFavorites((prev) => ({ ...prev, [productId]: true }));
        }
      }
    },
    [addFavorite, favorites],
  );

  useEffect(() => {
    const el = document.getElementById(`category-${selectedCategory}`);
    if (!indicatorRef.current || !el) return;

    const { offsetLeft, offsetWidth } = el;
    indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
    indicatorRef.current.style.width = `${offsetWidth}px`;

    const container = scrollContainerRef.current;
    if (container) {
      const containerWidth = container.clientWidth;
      if (
        offsetLeft < container.scrollLeft ||
        offsetLeft + offsetWidth > container.scrollLeft + containerWidth
      ) {
        container.scrollTo({
          left: offsetLeft - containerWidth / 2 + offsetWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (categories.length > 0) {
      setTimeout(checkScrollPosition, 100);
    }
  }, [categories, checkScrollPosition]);

  useEffect(() => {
    if (
      JSON.stringify(prevFavoriteListRef.current) !==
      JSON.stringify(favoriteList)
    ) {
      const initialFavorites = favoriteList.reduce(
        (acc: { [key: number]: boolean }, item: { productId: number }) => {
          acc[item.productId] = true;
          return acc;
        },
        {} as { [key: number]: boolean },
      );
      setFavorites(initialFavorites);
      prevFavoriteListRef.current = favoriteList;
    }
  }, [favoriteList]);

  return {
    state: {
      categories,
      selectedCategory,
      canScrollLeft,
      canScrollRight,
      favorites,
      productData,
      isCategoriesLoading,
      userInfo,
    },
    refs: {
      ref,
      indicatorRef,
      scrollContainerRef,
    },
    handler: {
      setSelectedCategory,
      scrollLeft,
      scrollRight,
      handleAddToCart,
      handleToggleFavorite,
      checkScrollPosition,
      router,
    },
  };
};

export { useProductHome };
