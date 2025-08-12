import { StarRatingProps } from "@/types/feedBack.types";
import { Star } from "lucide-react";

const StarRating = ({ rating, size = "sm" }: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating
              ? "fill-yellow-300 text-yellow-300"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
