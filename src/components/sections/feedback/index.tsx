import { useGetFeedBacksListQuery } from "@/apis/feedbacksApi";
import { formatDateFeedback } from "@/utils";
import { Button } from "antd";
import { Plus, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { FeedbackSkeleton } from "@/components";

import {
  Feedback,
  FeedbackApiResponse,
  FeedbackSectionProps,
} from "@/types/feedBack.types";
import RatingOverview from "@/components/sections/feedback/RatingOverview";
import FilterBar from "@/components/sections/feedback/FilterBar";
import FeedbackCard from "@/components/sections/feedback/FeedbackCard";
import EmptyState from "@/components/sections/feedback/EmptyState";
import ReviewModal from "@/components/sections/feedback/ReviewModal";
import LoadingState from "@/components/sections/feedback/LoadingState";

const FeedbackSection = ({ productId }: FeedbackSectionProps) => {
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState([
    { stars: 5, percentage: 0, count: 0 },
    { stars: 4, percentage: 0, count: 0 },
    { stars: 3, percentage: 0, count: 0 },
    { stars: 2, percentage: 0, count: 0 },
    { stars: 1, percentage: 0, count: 0 },
  ]);
  const [hasMorePages, setHasMorePages] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const {
    data: feedbackData,
    isLoading,
    isFetching,
  } = useGetFeedBacksListQuery({
    PageIndex: pageIndex,
    PageSize: 10,
    productId: productId,
  });

  const transformFeedback = (item: FeedbackApiResponse): Feedback => ({
    id: item.id,
    userName: item.userName || `User${item.userId}`,
    userImage: undefined,
    rate: item.rate,
    image: item.image,
    userId: item.userId,
    createDate: formatDateFeedback(item.createDate),
    updateDate: item.updateDate,
    content: item.content,
    productName: item.productName,
    fullName: item?.user?.fullName,
    avatar: item?.user?.avatar || "",
  });

  const calculateStats = (feedbackList: Feedback[]) => {
    if (feedbackList.length === 0) {
      setAverageRating(0);
      setRatingDistribution([
        { stars: 5, percentage: 0, count: 0 },
        { stars: 4, percentage: 0, count: 0 },
        { stars: 3, percentage: 0, count: 0 },
        { stars: 2, percentage: 0, count: 0 },
        { stars: 1, percentage: 0, count: 0 },
      ]);
      return;
    }

    const avgRating =
      feedbackList.reduce((sum, feedback) => sum + feedback.rate, 0) /
      feedbackList.length;
    setAverageRating(Math.round(avgRating * 10) / 10);

    const distribution = [5, 4, 3, 2, 1].map((stars) => {
      const count = feedbackList.filter((f) => f.rate === stars).length;
      const percentage =
        feedbackList.length > 0 ? (count / feedbackList.length) * 100 : 0;
      return { stars, count, percentage };
    });

    setRatingDistribution(distribution);
  };

  useEffect(() => {
    if (feedbackData) {
      const transformedFeedbacks = feedbackData.map(transformFeedback);

      if (pageIndex === 1) {
        setFeedbacks(transformedFeedbacks);
      } else {
        setFeedbacks((prev) => [...prev, ...transformedFeedbacks]);
        setLoadingMore(false);
      }

      setTotalFeedbacks(feedbackData.totalCount || feedbackData?.length);
      setHasMorePages(feedbackData.hasNextPage || false);

      const allFeedbacks =
        pageIndex === 1
          ? transformedFeedbacks
          : [...feedbacks, ...transformedFeedbacks];
      calculateStats(allFeedbacks);
    }
  }, [feedbackData]);

  const handleFeedbackCreated = (newFeedback: Feedback) => {
    console.log("check newFeedback", newFeedback);
    setFeedbacks((prev) => [newFeedback, ...prev]);
    setTotalFeedbacks((prev) => prev + 1);
    const updatedFeedbacks = [newFeedback, ...feedbacks];
    calculateStats(updatedFeedbacks);
  };

  const handleFeedbackDeleted = (feedbackId: number) => {
    setFeedbacks((prev) => prev.filter((f) => f.id !== feedbackId));
    setTotalFeedbacks((prev) => prev - 1);
    const updatedFeedbacks = feedbacks.filter((f) => f.id !== feedbackId);
    calculateStats(updatedFeedbacks);
  };

  const handleModalClose = () => {
    setIsReviewModalOpen(false);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPageIndex((prev) => prev + 1);
  };

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesRating =
      selectedRating === "all" ||
      (selectedRating === "images"
        ? feedback.image && feedback.image.trim() !== ""
        : feedback.rate === parseInt(selectedRating));

    const matchesSearch =
      searchQuery === "" ||
      feedback.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.userName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRating && matchesSearch;
  });

  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
        );
      case "oldest":
        return (
          new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
        );
      case "rating-high":
        return b.rate - a.rate;
      case "rating-low":
        return a.rate - b.rate;
      default:
        return 0;
    }
  });

  if (isLoading && pageIndex === 1) {
    return <LoadingState />;
  }

  return (
    <div className="mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Đánh giá sản phẩm
          </h2>
          <p className="text-gray-600">
            {totalFeedbacks} đánh giá từ khách hàng
          </p>
        </div>
        <Button
          type="primary"
          onClick={() => setIsReviewModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-5 text-white transition-colors"
        >
          <Plus className="h-4 w-4" />
          Viết đánh giá
        </Button>
      </div>

      <RatingOverview
        averageRating={averageRating}
        totalFeedbacks={totalFeedbacks}
        ratingDistribution={ratingDistribution}
      />

      <FilterBar
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        sortBy={sortBy}
        setSortBy={setSortBy}
        ratingDistribution={ratingDistribution}
        totalFeedbacks={totalFeedbacks}
        feedbacks={feedbacks}
        filteredFeedbacks={filteredFeedbacks}
      />

      <div className="space-y-6">
        {sortedFeedbacks.length > 0 ? (
          <>
            {sortedFeedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback?.id}
                feedback={feedback}
                onFeedbackDeleted={handleFeedbackDeleted}
              />
            ))}

            {hasMorePages && (
              <div className="text-center">
                <Button
                  onClick={handleLoadMore}
                  loading={loadingMore || isFetching}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <TrendingUp className="h-4 w-4" />
                  {loadingMore || isFetching
                    ? "Đang tải..."
                    : "Xem thêm đánh giá"}
                </Button>
              </div>
            )}

            {(loadingMore || (isFetching && pageIndex > 1)) && (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <FeedbackSkeleton key={`loading-${i}`} />
                ))}
              </div>
            )}
          </>
        ) : (
          <EmptyState
            selectedRating={selectedRating}
            searchQuery={searchQuery}
            onWriteReview={() => setIsReviewModalOpen(true)}
          />
        )}
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleModalClose}
        productId={productId}
        onFeedbackCreated={handleFeedbackCreated}
      />
    </div>
  );
};

export default FeedbackSection;
