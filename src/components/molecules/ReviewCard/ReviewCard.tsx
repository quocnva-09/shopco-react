import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Rating } from "@/components/atoms/Rating/Rating";
import { Text } from "@/components/atoms/Text/Text";
import { IconButton } from "@/components/atoms/IconButton";
import "./ReviewCard.scss";
import { Icon } from "@/components/atoms/Icon/Icon";
import type { ReviewData } from "@/types/review";

export type ReviewCardProps = ComponentPropsWithoutRef<"div"> & {
  review: ReviewData;
  showMenu?: boolean;
  onMenuClick?: () => void;
  showDate?: boolean;
};

export const ReviewCard = ({
  review,
  showMenu = false,
  showDate = true,
  onMenuClick,
  className,
  ...rest
}: ReviewCardProps) => {
  const { name, rating, comment, date, isVerified = true } = review;

  return (
    <div className={clsx("review-card", className)} {...rest}>
      <div className="review-card__header">
        <Rating value={rating} showText={false} />

        {(showMenu || onMenuClick) && (
          <IconButton
            svgName="icn-3-dot"
            aria-label="Review options"
            className="review-card__menu"
            iconHeight={24}
            iconWidth={24}
            onClick={onMenuClick}
          />
        )}
      </div>

      {/* 2. Name + Verified Icon block with integrated Custom Tooltip */}
      <div className="review-card__name">
        <Text
          as="span"
          lineClamp={1}
          showTooltip
          mobileLineClamp={2}
          mobileShowTooltip={false}
          className="review-card__name-text"
          tooltipClassName="tooltip--review-card"
        >
          {name}
        </Text>
        {isVerified && (
          <Icon
            svgName="icn-verified"
            className="verified-icon"
            color="green"
          />
        )}
      </div>

      {/* 3. Comment content block: truncated to 3 lines on Desktop, fully expanded on Mobile */}
      <Text
        as="p"
        lineClamp={3}
        showTooltip={true}
        className="review-card__comment"
        tooltipClassName="tooltip--comment"
      >
        {comment}
      </Text>

      {/* 4. Post date block */}
      {showDate && <time className="review-card__date">Posted {date}</time>}
    </div>
  );
};
