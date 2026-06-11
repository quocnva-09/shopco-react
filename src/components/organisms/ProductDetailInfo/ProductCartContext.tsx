import { createContext, useContext, type ReactNode } from "react";
import { useProductCart } from "@/hooks/useProductCart";
import type { ProductData } from "@/types/product";

type ProductCartContextType = ReturnType<typeof useProductCart>;

const ProductCartContext = createContext<ProductCartContextType | null>(null);

export const ProductCartProvider = ({
  product,
  children,
}: {
  product: ProductData;
  children: ReactNode;
}) => {
  const cartState = useProductCart(product);

  return (
    <ProductCartContext.Provider value={cartState}>
      {children}
    </ProductCartContext.Provider>
  );
};

export const useProductCartContext = () => {
  const context = useContext(ProductCartContext);
  if (!context) {
    throw new Error(
      "useProductCartContext must be used within a ProductCartProvider"
    );
  }
  return context;
};
