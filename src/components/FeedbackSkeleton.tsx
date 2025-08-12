const FeedbackSkeleton = () => (
  <div className="animate-pulse rounded-lg bg-white p-6 shadow-sm">
    <div className="mb-4 flex items-start gap-4">
      <div className="h-12 w-12 rounded-full bg-gray-200"></div>
      <div className="flex-1">
        <div className="mb-2 h-4 w-32 rounded bg-gray-200"></div>
        <div className="h-3 w-48 rounded bg-gray-200"></div>
      </div>
    </div>
    <div className="mb-4 space-y-2">
      <div className="h-3 w-full rounded bg-gray-200"></div>
      <div className="h-3 w-3/4 rounded bg-gray-200"></div>
    </div>
    <div className="flex gap-3">
      <div className="h-20 w-20 rounded-lg bg-gray-200"></div>
      <div className="h-20 w-20 rounded-lg bg-gray-200"></div>
    </div>
  </div>
);

export default FeedbackSkeleton;
