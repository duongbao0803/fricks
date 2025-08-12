import { useCreateFeedbackMutation } from "@/apis/feedbacksApi";
import { showToast } from "@/hooks/useShowToast";
import useUserInfo from "@/hooks/useUserInfo";
import { Feedback, ReviewModalPropsExtended } from "@/types/feedBack.types";
import { Button, Input, Modal, Rate, message } from "antd";
import { Sparkles, Star } from "lucide-react";
import { useState } from "react";

const ReviewModal = ({
  isOpen,
  onClose,
  productId,
  onFeedbackCreated,
}: ReviewModalPropsExtended) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const { userInfo } = useUserInfo();
  const [createFeedback, { isLoading: isCreating }] =
    useCreateFeedbackMutation();

  const handleSubmit = async () => {
    if (!comment.trim()) {
      message.error("Vui lòng nhập nội dung đánh giá");
      return;
    }

    try {
      const payload = {
        productId,
        rate: rating,
        content: comment.trim(),
        image: "",
      };

      const response = await createFeedback(payload as any).unwrap();
      message.success("Đánh giá của bạn đã được gửi thành công");

      const newFeedback: Feedback = {
        id: response?.data?.id,
        userName: userInfo?.fullName || userInfo?.username || "Vô danh",
        userImage: undefined,
        rate: rating,
        image: "",
        userId: userInfo?.id || 0,
        createDate: response?.data?.createDate || new Date().toISOString(),
        updateDate: response?.data?.createDate || new Date().toISOString(),
        content: response?.data?.content || comment.trim(),
        productName: "",
        fullName: userInfo?.fullName || userInfo?.username || "Vô danh",
        avatar: userInfo?.avatar || "",
      };

      if (onFeedbackCreated) {
        onFeedbackCreated(newFeedback);
      }

      onClose();
      setRating(5);
      setComment("");
    } catch (error: any) {
      const errorMsg = error && error?.data?.message;
      if (errorMsg) {
        showToast("error", errorMsg);
        return;
      }

      message.error("Có lỗi xảy ra khi gửi đánh giá");
    }
  };

  const ratingDescriptions = {
    1: "Rất tệ",
    2: "Kém",
    3: "Bình thường",
    4: "Tốt",
    5: "Xuất sắc",
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">Viết đánh giá</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      width={600}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={isCreating}
        >
          Gửi đánh giá
        </Button>,
      ]}
    >
      <div className="space-y-6 py-4">
        <div className="rounded-lg bg-thirdly/30 p-4">
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Đánh giá tổng thể
          </label>
          <div className="text-center">
            <Rate
              value={rating}
              onChange={setRating}
              className="text-2xl"
              character={<Star className="fill-current" />}
            />
            <p className="mt-2 text-sm text-gray-600">
              {ratingDescriptions[rating as keyof typeof ratingDescriptions]}
            </p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Nhận xét chi tiết
          </label>
          <Input.TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
            maxLength={1000}
            showCount
          />
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
