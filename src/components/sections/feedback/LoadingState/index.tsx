import { FeedbackSkeleton } from "@/components";

const LoadingState = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
        <p className="text-gray-600">Đang tải đánh giá...</p>
      </div>
      {[1, 2, 3].map((i) => (
        <FeedbackSkeleton key={i} />
      ))}
    </div>
  );
};

export default LoadingState;
