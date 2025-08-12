import { EmptyStateProps } from "@/types/feedBack.types";
import { Button } from "antd";
import { Sparkles, Star } from "lucide-react";

const EmptyState = ({
  selectedRating,
  searchQuery,
  onWriteReview,
}: EmptyStateProps) => {
  const isEmptyResults = selectedRating === "all" && !searchQuery;

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 py-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
        <Star className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">
        {isEmptyResults
          ? "Chưa có đánh giá nào"
          : "Không tìm thấy đánh giá phù hợp"}
      </h3>
      <p className="mb-4 text-gray-600">
        {isEmptyResults
          ? "Hãy là người đầu tiên đánh giá sản phẩm này"
          : "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"}
      </p>
      {isEmptyResults && (
        <Button
          type="primary"
          onClick={onWriteReview}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-5 text-white transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          Viết đánh giá đầu tiên
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
