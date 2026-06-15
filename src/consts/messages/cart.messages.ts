export const TOAST_MESSAGES = {
  PRODUCT_ADDED_TO_CART: ({ productName }: { productName: string }) =>
    `${productName} added to cart`,
  PRODUCT_UPDATED_TO_CART: ({ productName }: { productName: string }) =>
    `${productName} updated successfully`,
  PRODUCT_REMOVED_FROM_CART: ({ productName }: { productName: string }) =>
    `${productName} removed successfully`,
};

export const CART_LIMIT_MESSAGES = {
  MAX_PER_ITEM: (max: number, name: string) =>
    `You can only add up to ${max} of ${name} item.`,
  MAX_TOTAL_QUANTITY: (max: number) =>
    `Your cart has reached the maximum capacity of ${max} items.`,
  PARTIAL_ADD: (quantity: number) =>
    `Only added ${quantity} item(s) to reach the limit.`,
};
