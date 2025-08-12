import { useAddFavoriteMutation } from "@/apis/favoriteProductApi";
import { showToast } from "@/hooks/useShowToast";
import { incrementFavoriteCount } from "@/redux/slices/favoriteSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFavorite = () => {
  const [loading, setLoading] = useState(false);
  const isFavorite = useSelector(
    (state: RootState) => state.persistedReducer.favorites.isFavorite,
  );
  const dispatch = useDispatch();

  const [addFavorite] = useAddFavoriteMutation();

  const toggleFavorite = async (productId: number) => {
    setLoading(true);

    try {
      if (!isFavorite) {
        showToast("success", "Sản phẩm đã có trong danh sách yêu thích");
      } else {
        await addFavorite({
          productId: productId,
        }).unwrap();
        showToast("success", "Thêm vào danh sách yêu thích thành công");
        dispatch(incrementFavoriteCount());
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return { isFavorite, toggleFavorite, loading };
};
