export interface Unit {
  id: number;
  name: string;
  code: string;
}

export interface ProductPrice {
  id: number;
  productId: number;
  unitId: number;
  price: number;
  unit: Unit;
}

export interface Brand {
  id: number;
  name: string;
  createDate?: string;
  updateDate?: string | null;
  isDeleted?: boolean;
  version?: string;
}

export interface Category {
  id: number;
  code: string;
  name: string;
  createDate?: string;
  updateDate?: string | null;
  isDeleted?: boolean;
  version?: string;
}

export interface ProductInfo {
  id: number;
  sku: string;
  name: string;
  image: string;
  categoryId: number;
  brandId: number;
  description: string;
  quantity: number;
  storeId: number;
  soldQuantity: number;
  brand: Brand;
  category: Category;
  storeName: string;
  price: ProductPrice[];
  createDate?: string;
  updateDate?: string | null;
  isDeleted?: boolean;
  version?: string;
  rate?: number;
  totalProductPrice?: number;
}

export interface ProductGridProps extends CategoryScrollProps {
  productData?: {
    items: ProductInfo[];
  };
  title: string;
  subtitle: string;
  badgeText: string;
  maxItems?: number;
  userInfo?: any;
  favorites?: { [key: number]: boolean };
  showViewMoreButton?: boolean;
  viewMoreHref?: string;
  viewMoreText?: string;
  onAddToCart: (product: ProductInfo, quantity: number, unit: any) => void;
  onToggleFavorite?: (productId: number) => void;
  loading?: boolean;
  skeletonCount?: number;

  className?: string;
  style?: React.CSSProperties;
  emptyStateText?: string;
  gridCols?: number;
}

export interface CategoryScrollProps {
  scrollLeft?: () => void;
  canScrollLeft?: boolean;
  scrollRight?: () => void;
  canScrollRight?: boolean;
  categories: { id: number; name: string }[];
  selectedCategory?: number;
  setSelectedCategory?: (id: number) => void;
  indicatorRef?: React.RefObject<HTMLDivElement>;
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
  checkScrollPosition?: () => void;
}
