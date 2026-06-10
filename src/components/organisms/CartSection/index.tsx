import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { CartItem as CartItemComponent } from "@/components/molecules/CartItem";
import { CartSummary } from "@/components/organisms/CartSummary";
import { Text } from "@/components/atoms/Text";
import { buildLineItems } from "@/utils/cart";
import type { CartItem } from "@/types/cart";
import "./index.scss";

export type CartSectionProps = ComponentPropsWithoutRef<"div"> & {
  items: CartItem[];
  deliveryFee: number;
  discount: number;
};

export const CartSection = ({
  items,
  deliveryFee,
  discount,
  className,
  ...rest
}: CartSectionProps) => {
  const lineItems = buildLineItems(items, deliveryFee, discount);
  const total = lineItems.reduce((sum, item) => sum + item.value, 0);

  return items.length === 0 ? (
    <Text as="p" className="cart__empty">
      Your cart is empty
    </Text>
  ) : (
    <div className={clsx("cart", className)} {...rest}>
      <div className="cart__items">
        {items.map((item) => (
          <CartItemComponent key={item.productVariantId} item={item} />
        ))}
      </div>
      <CartSummary lineItems={lineItems} total={total} />
    </div>
  );
};
