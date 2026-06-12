import { useCallback, useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Icon } from "@/components/atoms/Icon";
import { Rating } from "@/components/atoms/Rating";
import { Dropdown } from "@/components/molecules/Dropdown";
import type { MenuItem } from "@/components/molecules/MenuList";
import { WriteReviewModal } from "@/components/organisms/WriteReviewModal";
import type { WriteReviewPayload } from "@/types/payload/write-review.payload";
import { ReviewService } from "@/services/review.service";
import toast from "react-hot-toast";
import {
  SORT_ORDER,
  SORT_MENU_LABELS,
  RATING_FILTERS,
  DEFAULT_SORT_ORDER,
  type SortOrder,
  type RatingFilter,
} from "@/consts/reviewFilters";
import { WRITE_REVIEW_API_MESSAGES } from "@/consts/messages";
import "./index.scss";

export type ReviewsHeaderProps = ComponentPropsWithoutRef<"div"> & {
  reviewCount: number;
  sortOrder?: SortOrder;
  onSortChange?: (order: SortOrder) => void;
  ratingFilter?: RatingFilter | null;
  onRatingFilterChange?: (rating: RatingFilter | null) => void;
  onWriteReview?: (data: WriteReviewPayload) => void;
};

export const ReviewsHeader = ({
  reviewCount,
  sortOrder = DEFAULT_SORT_ORDER,
  onSortChange,
  ratingFilter,
  onRatingFilterChange,
  onWriteReview,
  className,
  ...rest
}: ReviewsHeaderProps) => {
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(false);

  const openWriteReviewModal = useCallback(() => setIsWriteReviewModalOpen(true), []);
  const closeWriteReviewModal = useCallback(() => setIsWriteReviewModalOpen(false), []);

  const handleWriteReviewSubmit = useCallback(
    async (data: WriteReviewPayload) => {
      try {
        await ReviewService.submitReview({
          order_id: data.order_id,
          product_id: data.product_id,
          rating: data.rating,
          comment: data.comment,
          guest_name: data.guest_name,
          guest_email: data.guest_email,
        });
        toast.success(WRITE_REVIEW_API_MESSAGES.SUBMIT_SUCCESS);
        closeWriteReviewModal();
        onWriteReview?.(data);
      } catch {
        toast.error(WRITE_REVIEW_API_MESSAGES.SUBMIT_ERROR);
      }
    },
    [closeWriteReviewModal, onWriteReview],
  );

  // Build menu items — Sort
  const sortMenuItems: MenuItem[] = Object.values(SORT_ORDER).map((order) => ({
    id: `sort-${order}`,
    label: SORT_MENU_LABELS[order],
    className: sortOrder === order ? "dropdown__item--active" : undefined,
    onClick: () => {
      onSortChange?.(order);
    },
  }));

  // Build menu items — Filter (star ratings 4→1)
  const filterMenuItems: MenuItem[] = RATING_FILTERS.map((n) => ({
    id: `rating-${n}`,
    label: <Rating value={n} showText={false} variant="row" />,
    className: ratingFilter === n ? "dropdown__item--active" : undefined,
    onClick: () => {
      onRatingFilterChange?.(n);
    },
  }));

  return (
    <div className={clsx("tab-content__header", className)} {...rest}>
      <Heading
        as="h2"
        lineClamp={0}
        showTooltip={false}
        className="tab-content__title"
      >
        {ratingFilter != null ? `${ratingFilter}-Star Reviews` : "All Reviews"}{" "}
        <Text as="span" className="reviews__count">
          ({reviewCount})
        </Text>
      </Heading>

      <div className="reviews__actions">
        {/* Filter dropdown */}
        <Dropdown>
          <Dropdown.Trigger>
            <IconButton
              svgName="icn-filter"
              variant="circular"
              className="button--filter"
              aria-label="Filter reviews"
            />
          </Dropdown.Trigger>

          <Dropdown.Menu
            items={filterMenuItems}
            itemClassName="dropdown__item"
            linkClassName="dropdown__item-btn"
            aria-label="Filter by rating"
          />
        </Dropdown>

        {/* Sort dropdown */}
        <Dropdown>
          <Dropdown.Trigger>
            <Button
              variant="solid"
              colorScheme="grey"
              className="button--dropdown"
              icon={<Icon svgName="icn-arrow-down" />}
              iconPosition="right"
            >
              {SORT_MENU_LABELS[sortOrder]}
            </Button>
          </Dropdown.Trigger>

          <Dropdown.Menu
            items={sortMenuItems}
            itemClassName="dropdown__item"
            linkClassName="dropdown__item-btn"
            aria-label="Sort reviews"
          />
        </Dropdown>

        <Button variant="solid" className="button--write-review" onClick={openWriteReviewModal}>
          Write a Review
        </Button>
      </div>

      <WriteReviewModal
        isOpen={isWriteReviewModalOpen}
        onClose={closeWriteReviewModal}
        onSubmit={handleWriteReviewSubmit}
      />
    </div>
  );
};
