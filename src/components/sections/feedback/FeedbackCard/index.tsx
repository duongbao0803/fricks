import { useDeleteFeedbackMutation } from "@/apis/feedbacksApi";
import StarRating from "@/components/sections/feedback/StarRating";
import useUserInfo from "@/hooks/useUserInfo";
import { FeedbackCardProps } from "@/types/feedBack.types";
import { Modal, message } from "antd";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const FeedbackCard = ({ feedback, onFeedbackDeleted }: FeedbackCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { userInfo } = useUserInfo();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const userId = userInfo?.id;
  const isOwner = userId && feedback?.userId === userId;
  const shouldTruncate = feedback?.content?.length > 200;

  const handleDeleteFeedback = async (feedbackId: number) => {
    Modal.confirm({
      title: "Xóa đánh giá",
      content: "Bạn có chắc chắn muốn xóa đánh giá này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: async () => {
        try {
          await deleteFeedback(feedbackId).unwrap();
          if (onFeedbackDeleted) {
            onFeedbackDeleted(feedbackId);
          }
          message.success("Đã xóa đánh giá thành công!");
        } catch (error) {
          message.error("Có lỗi xảy ra khi xóa đánh giá");
        }
      },
    });
  };

  return (
    <div className="rounded-lg border border-b border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
            <span className="text-lg font-bold">
              {feedback?.fullName?.charAt(0)?.toUpperCase() || "F"}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-900">
                {feedback?.fullName || "Vô danh"}
              </h4>
              {isOwner && (
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                  Của bạn
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm leading-8 text-gray-600">
              <StarRating rating={feedback?.rate} />
              <span>•</span>
              <span>{feedback?.createDate}</span>
            </div>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => handleDeleteFeedback(feedback?.id)}
              className="rounded-full p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
              title="Xóa đánh giá"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <p className="leading-relaxed text-gray-800">
          {shouldTruncate && !isExpanded
            ? `${feedback?.content?.substring(0, 200)}...`
            : feedback?.content}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-sm text-primary hover:text-secondary"
          >
            {isExpanded ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>

      <div className="border-t" />
    </div>
  );
};

export default FeedbackCard;
