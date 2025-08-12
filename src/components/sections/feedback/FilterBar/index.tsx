import { FilterBarProps } from "@/types/feedBack.types";
import { Select } from "antd";
import { X } from "lucide-react";

const FilterBar = ({
  selectedRating,
  setSelectedRating,
  sortBy,
  setSortBy,
  ratingDistribution,
  totalFeedbacks,
  feedbacks,
  filteredFeedbacks,
}: FilterBarProps) => {
  const filters = [
    { key: "all", label: "Tất cả" },
    { key: "5", label: "5 sao" },
    { key: "4", label: "4 sao" },
    { key: "3", label: "3 sao" },
    { key: "2", label: "2 sao" },
    { key: "1", label: "1 sao" },
    { key: "images", label: "Có hình ảnh" },
  ];
  const { Option } = Select;

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map(({ key, label }) => {
            let count = 0;
            if (key !== "all" && key !== "images") {
              count =
                ratingDistribution.find((r) => r?.stars === parseInt(key))
                  ?.count || 0;
            } else if (key === "images") {
              count = feedbacks.filter(
                (f) => f?.image && f?.image?.trim() !== "",
              ).length;
            } else {
              count = totalFeedbacks;
            }

            return (
              <button
                key={key}
                onClick={() => setSelectedRating(key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedRating === key
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
                <span className="ml-1 text-xs opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        <Select
          value={sortBy}
          onChange={(value) => setSortBy(value)}
          className="rounded-lg"
          style={{ minWidth: 150 }}
        >
          <Option value="newest">Mới nhất</Option>
          <Option value="oldest">Cũ nhất</Option>
          <Option value="rating-high">Đánh giá cao</Option>
          <Option value="rating-low">Đánh giá thấp</Option>
        </Select>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Hiển thị {filteredFeedbacks.length} trong {totalFeedbacks} đánh giá
        </span>
      </div>
    </div>
  );
};

export default FilterBar;
