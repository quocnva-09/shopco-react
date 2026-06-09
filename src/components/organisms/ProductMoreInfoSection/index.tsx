import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Tabs } from "@/components/molecules/Tabs";
import { ProductDetailsPanel } from "@/components/organisms/ProductDetailsPanel";
import { ProductReviewsPanel } from "@/components/organisms/ProductReviewsPanel";
import { ProductFaqsPanel } from "@/components/organisms/ProductFaqsPanel";
import "./index.scss";
import type { ReviewData } from "@/types/review";
import type { SortOrder, RatingFilter } from "@/consts/reviewFilters";

const PRODUCT_TABS = [
  { id: "details", label: "Product Details" },
  { id: "reviews", label: "Rating & Reviews" },
  { id: "faqs", label: "FAQs" },
];

const DEFAULT_ACTIVE_TAB = 'reviews';

export type ProductMoreInfoSectionProps = ComponentPropsWithoutRef<"div"> & {
  productDescription?: string;
  reviews: ReviewData[];
  reviewCount: number;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  faqContent?: string;
  sortOrder?: SortOrder;
  onSortChange?: (order: SortOrder) => void;
  ratingFilter?: RatingFilter | null;
  onRatingFilterChange?: (rating: RatingFilter | null) => void;
};

export const ProductMoreInfoSection = ({
  productDescription = "",
  reviews,
  reviewCount,
  hasMore,
  isLoadingMore,
  onLoadMore,
  faqContent = "",
  sortOrder,
  onSortChange,
  ratingFilter,
  onRatingFilterChange,
  className,
  ...rest
}: ProductMoreInfoSectionProps) => {
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_ACTIVE_TAB);
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={clsx("product-more-info", className)} {...rest}>
      <Tabs
        tabs={PRODUCT_TABS}
        activeTab={activeTab}
        onTabChange={handleTabClick}
      />
      <ProductDetailsPanel
        description={productDescription}
        className={clsx(
          "tab-content",
          activeTab === "details" && "tab-content--active",
        )}
      />
      <ProductReviewsPanel
        reviews={reviews}
        reviewCount={reviewCount}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        onLoadMore={onLoadMore}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
        ratingFilter={ratingFilter}
        onRatingFilterChange={onRatingFilterChange}
        className={clsx(
          "tab-content",
          activeTab === "reviews" && "tab-content--active",
        )}
      />
      <ProductFaqsPanel
        content={faqContent}
        className={clsx(
          "tab-content",
          activeTab === "faqs" && "tab-content--active",
        )}
      />
    </div>
  );
};
