import type { ProductCardData } from "@/types/product";

export const mockSortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest Arrivals" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

export const mockProducts: ProductCardData[] = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    currentPrice: 145,
    rating: 3.5,
    primaryImage: "https://via.placeholder.com/295x298.png?text=T-Shirt",
  },
  {
    id: 2,
    name: "Polo with Tipping Details",
    currentPrice: 180,
    rating: 4.5,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Polo",
  },
  {
    id: 3,
    name: "Black Striped T-shirt",
    currentPrice: 120,
    originalPrice: 150,
    discountPercentage: 20,
    rating: 5.0,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Striped",
  },
  {
    id: 4,
    name: "Skinny Fit Jeans",
    currentPrice: 240,
    originalPrice: 260,
    discountPercentage: 20,
    rating: 3.5,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Jeans",
  },
  {
    id: 5,
    name: "Checkered Shirt",
    currentPrice: 180,
    rating: 4.5,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Shirt",
  },
  {
    id: 6,
    name: "Sleeve Striped T-shirt",
    currentPrice: 130,
    originalPrice: 160,
    discountPercentage: 30,
    rating: 4.5,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Sleeve",
  },
  {
    id: 7,
    name: "Vertical Striped Shirt",
    currentPrice: 212,
    originalPrice: 232,
    discountPercentage: 20,
    rating: 5.0,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Vertical",
  },
  {
    id: 8,
    name: "Courage Graphic T-shirt",
    currentPrice: 145,
    rating: 4.0,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Courage",
  },
  {
    id: 9,
    name: "Loose Fit Bermuda Shorts",
    currentPrice: 80,
    rating: 3.0,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Shorts",
  },
];
