import StarRating from "@/components/sections/feedback/StarRating";
import { RatingOverviewProps } from "@/types/feedBack.types";
import { Progress } from "antd";
import { Star } from "lucide-react";

const RatingOverview = ({
  averageRating,
  totalFeedbacks,
  ratingDistribution,
}: RatingOverviewProps) => {
  const satisfactionRate = ratingDistribution
    .filter((r) => r.stars >= 4)
    .reduce((sum, r) => sum + r.count, 0);
  const satisfactionPercentage =
    totalFeedbacks > 0
      ? Math.round((satisfactionRate / totalFeedbacks) * 100)
      : 0;

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
      <div className="grid items-center gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
              <span className="text-2xl font-bold">{averageRating}</span>
            </div>
            <div>
              <StarRating rating={Math.round(averageRating)} size="md" />
              <p className="mt-1 text-sm text-gray-600">
                {totalFeedbacks.toLocaleString()} đánh giá
              </p>
            </div>
          </div>
          <div className="text-sm text-secondary">
            {satisfactionPercentage}% khách hàng hài lòng
          </div>
        </div>
        <div className="md:col-span-2">
          <h4 className="mb-4 text-sm font-medium text-gray-700">
            Phân bổ đánh giá
          </h4>
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, percentage, count }) => (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex w-12 items-center gap-1 text-sm">
                  <span>{stars}</span>
                  <Star className="h-3 w-3 fill-yellow-300 text-yellow-300" />
                </div>

                <Progress
                  percent={percentage}
                  strokeColor="#FACC15"
                  trailColor="#F3F4F6"
                  showInfo={false}
                  size="small"
                />

                <div className="w-12 text-right text-sm text-gray-500">
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingOverview;
