import type { CartItem } from "@/types/cart";
import type { SummaryLineItem } from "@/components/organisms/CartSummary";

export const buildLineItems = (
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
