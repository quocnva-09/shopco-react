import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Tabs } from "@/components/molecules/Tabs";
import { ProductDetailsPanel } from "@/components/organisms/ProductDetailsPanel";
import { ProductReviewsPanel } from "@/components/organisms/ProductReviewsPanel";
import { ProductFaqsPanel } from "@/components/organisms/ProductFaqsPanel";
import type { ReviewData } from "@/components/molecules/ReviewCard/ReviewCard";
import "./ProductMoreInfoSection.scss";

const PRODUCT_TABS = [
  { id: "details", label: "Product Details" },
  { id: "reviews", label: "Rating & Reviews" },
  { id: "faqs", label: "FAQs" },
];

// TODO: activeTab sẽ dùng useState khi implement React hooks
const DEFAULT_ACTIVE_TAB = "reviews";

export type ProductMoreInfoSectionProps = ComponentPropsWithoutRef<"div"> & {
  productDescription?: string;
  reviews: ReviewData[];
  reviewCount: number;
  faqContent?: string;
};

export const ProductMoreInfoSection = ({
  productDescription = "",
  reviews,
  reviewCount,
  faqContent = "",
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
