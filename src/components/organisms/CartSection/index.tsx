import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { CartItem as CartItemComponent } from "@/components/molecules/CartItem";
import { CartSummary } from "@/components/organisms/CartSummary";
import { Text } from "@/components/atoms/Text";
import type { SummaryLineItem } from "@/components/organisms/CartSummary";
import type { CartItem } from "@/types/cart";
import "./index.scss";

export type CartSectionProps = ComponentPropsWithoutRef<"div"> & {
  items: CartItem[];
  deliveryFee: number;
  discount: number;
};

const buildLineItems = (
  items: CartItem[],
  deliveryFee: number,
  discount: number,
): SummaryLineItem[] => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.priceDiscount * item.quantity,
    0,
  );

  const lineItems: SummaryLineItem[] = [{ label: "Subtotal", value: subtotal }];

  if (discount > 0) {
    lineItems.push({ label: "Discount", value: -discount, isDiscount: true });
  }

  lineItems.push({ label: "Delivery Fee", value: deliveryFee });

  return lineItems;
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
