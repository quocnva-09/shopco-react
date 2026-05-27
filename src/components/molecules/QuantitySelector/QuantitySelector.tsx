import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { IconButton } from "@/components/atoms/IconButton";
import { Text } from "@/components/atoms/Text";
import "./QuantitySelector.scss";

export interface QuantitySelectorProps extends ComponentPropsWithoutRef<"div"> {
  defaultValue?: number;
  min?: number;
}

export const QuantitySelector = ({
  defaultValue = 1,
  min = 1,
  className,
  ...rest
}: QuantitySelectorProps) => {
  return (
    <div className={clsx("quantity-selector", className)} {...rest}>
      <IconButton
        svgName="icn-minus"
        aria-label="Decrease quantity"
        className="quantity-selector__btn quantity-selector__btn--minus"
        variant="ghost"
      />
      <Text as="span" className="quantity-selector__value">
        {defaultValue}
      </Text>
      <IconButton
        svgName="icn-plus"
        aria-label="Increase quantity"
        className="quantity-selector__btn quantity-selector__btn--plus"
        variant="ghost"
      />
    </div>
  );
};
