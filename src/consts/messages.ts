export const TOAST_MESSAGES = {
  PRODUCT_ADDED_TO_CART: ({ productName }: { productName: string }) =>
    `${productName} added to cart`,
  PRODUCT_UPDATED_TO_CART: ({ productName }: { productName: string }) =>
    `${productName} updated successfully`,
  PRODUCT_REMOVED_FROM_CART: ({ productName }: { productName: string }) =>
    `${productName} removed successfully`,
};

export const CONFIRM_MESSAGES = {
  DEFAULT_TITLE: "Confirm Action",
  DEFAULT_MESSAGE: "Are you sure you want to perform this action?",
  DELETE_REVIEW_TITLE: "Delete Review",
  DELETE_REVIEW_MESSAGE: "Are you sure you want to delete this review? This action cannot be undone.",
};
