// Cart page mock data & types

export interface CartItemVariant {
  label: string;
  value: string;
}

export interface CartItemData {
  id: string | number;
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: number;
  quantity: number;
  variants: CartItemVariant[];
}

export interface SummaryLineItem {
  label: string;
  value: number;
  isDiscount?: boolean;
}

export interface CartSummaryData {
  lineItems: SummaryLineItem[];
  total: number;
}

export const MOCK_CART_ITEMS: CartItemData[] = [
  {
    id: "cart-1",
    name: "Gradient Graphic T-shirt",
    imageSrc:
      "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png",
    imageAlt: "Gradient Graphic T-shirt",
    price: 145,
    quantity: 1,
    variants: [
      { label: "Size", value: "Large" },
      { label: "Color", value: "White" },
    ],
  },
  {
    id: "cart-2",
    name: "Checkered Shirt",
    imageSrc:
      "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png",
    imageAlt: "Checkered Shirt",
    price: 180,
    quantity: 1,
    variants: [
      { label: "Size", value: "Medium" },
      { label: "Color", value: "Red" },
    ],
  },
  {
    id: "cart-3",
    name: "Skinny Fit Jeans",
    imageSrc:
      "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png",
    imageAlt: "Skinny Fit Jeans",
    price: 240,
    quantity: 1,
    variants: [
      { label: "Size", value: "Large" },
      { label: "Color", value: "Blue" },
    ],
  },
];

export const MOCK_CART_SUMMARY: CartSummaryData = {
  lineItems: [
    { label: "Subtotal", value: 565 },
    { label: "Discount (-20%)", value: -113, isDiscount: true },
    { label: "Delivery Fee", value: 15 },
  ],
  total: 467,
};
