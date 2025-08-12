import { UserInfo } from "@/types/personal.types";

export interface CreateFeedBackReq {
  productId: number;
  image: string;
  content: string;
  rate: number;
}

export interface UpdateFeedBackReq {
  id: number;
  productId: number;
  image: string;
  content: string;
  rate: number;
}

export interface GetFeedBack {
  PageIndex: number;
  PageSize: number;
  productId: number;
}

export interface FeedbackSectionProps {
  productId: number;
}

export interface Feedback {
  id: number;
  userName: string;
  userImage?: string;
  rate: number;
  image?: string;
  userId?: number;
  createDate: string;
  updateDate: string | null;
  content: string;
  productName: string;
  fullName: string;
  avatar: string;
}

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  onFeedbackCreated?: (feedback: Feedback) => void;
}

export interface FeedbackApiResponse {
  userId: number;
  productId: number;
  image: string;
  content: string;
  rate: number;
  userName: string | null;
  productName: string;
  id: number;
  createDate: string;
  updateDate: string | null;
  isDeleted: boolean;
  version: string;
  user: UserInfo;
}

export interface RatingDistribution {
  stars: number;
  percentage: number;
  count: number;
}

export interface RatingOverviewProps {
  averageRating: number;
  totalFeedbacks: number;
  ratingDistribution: RatingDistribution[];
}

export interface EmptyStateProps {
  selectedRating: string;
  searchQuery: string;
  onWriteReview: () => void;
}

export interface ReviewModalPropsExtended extends ReviewModalProps {
  onFeedbackCreated?: (feedback: Feedback) => void;
}

export interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export interface FilterBarProps {
  selectedRating: string;
  setSelectedRating: (rating: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;

  ratingDistribution: RatingDistribution[];
  totalFeedbacks: number;
  feedbacks: any[];
  filteredFeedbacks: any[];
}

export interface FeedbackCardProps {
  feedback: Feedback;
  onFeedbackDeleted?: (feedbackId: number) => void;
}
