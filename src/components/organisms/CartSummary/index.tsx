import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { PriceText } from "@/components/atoms/PriceText";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { CHECKOUT_MESSAGES } from "@/consts/messages";
import "./index.scss";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes";

export interface SummaryLineItem {
  label: string;
  value: number;
  isDiscount?: boolean;
}

export type CartSummaryProps = ComponentPropsWithoutRef<"aside"> & {
  lineItems: SummaryLineItem[];
  total: number;
  isCheckout?: boolean;
};

export const CartSummary = ({
  lineItems,
  total,
  isCheckout,
  className,
  ...rest
}: CartSummaryProps) => {
  return (
    <aside className={clsx("cart-summary", className)} {...rest}>
      <Heading
        as="h2"
        lineClamp={0}
        showTooltip={false}
        className="cart-summary__title"
      >
        {isCheckout ? CHECKOUT_MESSAGES.ORDER_SUMMARY : "Order Summary"}
      </Heading>

      <div className="cart-summary__list">
        {lineItems.map((item) => (
          <div
            key={item.label}
            className={clsx(
              "cart-summary__item",
              item.isDiscount && "cart-summary__item--discount",
            )}
          >
            <Text as="span" className="cart-summary__label">
              {item.label}
            </Text>
            <PriceText value={item.value} className="cart-summary__value" />
          </div>
        ))}
      </div>

      <div className="cart-summary__total">
        <Text as="span" className="cart-summary__label">
          Total
        </Text>
        <PriceText value={total} className="cart-summary__value" />
      </div>

      {!isCheckout && (
        <form
          className="cart-summary__promo"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="cart-summary__promo-input-wrapper">
            <IconButton
              svgName="icn-voucher"
              aria-label="Voucher icon"
              variant="ghost"
              className="cart-summary__icon"
            />
            <Input
              type="text"
              unstyled
              placeholder="Add promo code"
              className="cart-summary__promo-input"
            />
          </div>
          <Button type="submit" variant="solid" className="cart-summary__apply">
            Apply
          </Button>
        </form>
      )}

      {isCheckout ? (
        <Button
          variant="solid"
          fullWidth
          className="cart-summary__checkout"
          type="submit"
          form="checkout-form"
        >
          {CHECKOUT_MESSAGES.PLACE_ORDER}
        </Button>
      ) : (
        <Link to={PATHS.CHECKOUT} state={{ fromCart: true }} className="cart-summary__link">
          <Button variant="solid" fullWidth className="cart-summary__checkout">
            Go to Checkout
            <span className="cart-summary__checkout-arrow">→</span>
          </Button>
        </Link>
      )}
    </aside>
  );
};
