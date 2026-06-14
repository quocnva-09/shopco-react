import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Rating } from "@/components/atoms/Rating";
import { Text } from "@/components/atoms/Text";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";
import { Icon } from "@/components/atoms/Icon";
import type { ReviewData } from "@/types/review";
import { Dropdown } from "@/components/molecules/Dropdown";
import type { MenuItem } from "@/components/molecules/MenuList";
import {
  REVIEW_MENU_ACTIONS,
  REVIEW_MENU_LABELS,
} from "@/consts/reviewFilters";

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

  const menuItems: MenuItem[] = Object.values(REVIEW_MENU_ACTIONS).map(
    (action) => ({
      id: `review-${action}`,
      label: REVIEW_MENU_LABELS[action],
      onClick: () => {
        // Dropdown automatically handles its own closure if needed, or we can leave this empty
      },
    }),
  );

  return (
    <div className={clsx("review-card", className)} {...rest}>
      <div className="review-card__header">
        <Rating value={rating} showText={false} size="md" />

        {showMenu && (
          <Dropdown>
            <Dropdown.Trigger>
              <IconButton
                svgName="icn-3-dot"
                aria-label="Review options"
                iconWidth={24}
                iconHeight={7}
                className="review-card__menu"
              />
            </Dropdown.Trigger>

            <Dropdown.Menu
              items={menuItems}
              itemClassName="dropdown__item"
              linkClassName="dropdown__item-btn"
              aria-label="Review options"
            />
          </Dropdown>
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
