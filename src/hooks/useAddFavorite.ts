import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from "@/apis/favoriteProductApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { incrementFavoriteCount } from "@/redux/slices/favoriteSlice";
import { notify } from "@/components/common/Notification";

export const useFavorite = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const toggleFavorite = async (productId: number) => {
    console.log("cjeckl productId", productId);
    setLoading(true);

    try {
      if (isFavorite) {
        notify("success", "Sản phẩm đã có trong danh sách yêu thích", 2);
      } else {
        await addFavorite({
          productId: productId,
        }).unwrap();
        notify("success", "Thêm vào danh sách yêu thích thành công", 2);
        dispatch(incrementFavoriteCount());
        setIsFavorite(true);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error toggling favorite:", error);
    }
  };

  return { isFavorite, toggleFavorite, loading };
};
