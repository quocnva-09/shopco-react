import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Icon } from "@/components/atoms/Icon";
import "./ReviewsHeader.scss";

export interface ReviewsHeaderProps extends ComponentPropsWithoutRef<"div"> {
  reviewCount: number;
}

export const ReviewsHeader = ({
  reviewCount,
  className,
  ...rest
}: ReviewsHeaderProps) => {
  return (
    <div className={clsx("tab-content__header", className)} {...rest}>
      <Heading
        as="h2"
        lineClamp={0}
        showTooltip={false}
        className="tab-content__title"
      >
        All Reviews{" "}
        <Text as="span" className="reviews__count">
          ({reviewCount})
        </Text>
      </Heading>

      <div className="reviews__actions">
        <IconButton
          svgName="icn-filter"
          variant="circular"
          className="button--filter"
          aria-label="Filter reviews"
        />
        <Button
          variant="solid"
          colorScheme="grey"
          className="button--dropdown"
          icon={<Icon svgName="icn-arrow-down" />}
          iconPosition="right"
        >
          Latest
        </Button>
        <Button variant="solid" className="button--write-review">
          Write a Review
        </Button>
      </div>
    </div>
  );
};
