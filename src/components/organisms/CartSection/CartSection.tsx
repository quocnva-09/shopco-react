import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { CartItem } from "@/components/molecules/CartItem";
import { CartSummary } from "@/components/organisms/CartSummary";
import type { SummaryLineItem } from "@/components/organisms/CartSummary";
import type { CartItemData } from "@/consts/cartData";
import "./CartSection.scss";

export interface CartSectionProps extends ComponentPropsWithoutRef<"div"> {
  items: CartItemData[];
  lineItems: SummaryLineItem[];
  total: number;
}

export const CartSection = ({
  items,
  lineItems,
  total,
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

      <CartSummary lineItems={lineItems} total={total} />
    </div>
  );
};
