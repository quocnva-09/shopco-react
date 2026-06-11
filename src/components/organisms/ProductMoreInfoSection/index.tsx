import {
  useState,
  cloneElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from "react";
import clsx from "clsx";
import { Tabs } from "@/components/molecules/Tabs";
import "./index.scss";

const PRODUCT_TABS = [
  { id: "details", label: "Product Details" },
  { id: "reviews", label: "Rating & Reviews" },
  { id: "faqs", label: "FAQs" },
];

const DEFAULT_ACTIVE_TAB = "reviews";

export type ProductMoreInfoSectionProps = ComponentPropsWithoutRef<"div"> & {
  detailsPanel: ReactElement<{ className?: string }>;
  reviewsPanel: ReactElement<{ className?: string }>;
  faqsPanel: ReactElement<{ className?: string }>;
};

export const ProductMoreInfoSection = ({
  detailsPanel,
  reviewsPanel,
  faqsPanel,
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
      {cloneElement(detailsPanel, {
        className: clsx(
          "tab-content",
          activeTab === "details" && "tab-content--active",
          detailsPanel.props.className,
        ),
      })}
      {cloneElement(reviewsPanel, {
        className: clsx(
          "tab-content",
          activeTab === "reviews" && "tab-content--active",
          reviewsPanel.props.className,
        ),
      })}
      {cloneElement(faqsPanel, {
        className: clsx(
          "tab-content",
          activeTab === "faqs" && "tab-content--active",
          faqsPanel.props.className,
        ),
      })}
    </div>
  );
};
