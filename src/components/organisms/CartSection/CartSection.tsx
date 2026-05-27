import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { CartItem } from "@/components/molecules/CartItem";
import { CartSummary } from "@/components/organisms/CartSummary";
import type { CartItemData, CartSummaryData } from "@/consts/cartData";
import "./CartSection.scss";

export interface CartSectionProps extends ComponentPropsWithoutRef<"div"> {
  items: CartItemData[];
  summary: CartSummaryData;
}

export const CartSection = ({
  items,
  summary,
  className,
  ...rest
}: CartSectionProps) => {
  return (
    <div className={clsx("cart", className)} {...rest}>
      <div className="cart__items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <CartSummary summary={summary} />
    </div>
  );
};
