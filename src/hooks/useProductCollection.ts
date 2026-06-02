import { ProductService } from "@/services/product.service";
import type { ProductParams } from "@/types/api/product.api";
import type { ProductCardData } from "@/types/product";
import { mapProductCardData } from "@/utils/mappers/product.mapper";
import { useEffect, useState } from "react";

type UseProductCollectionOptions = {
  enabled?: boolean;
};

export const useProductCollection = (
  params: ProductParams,
  options: UseProductCollectionOptions = {},
) => {
  const { enabled = true } = options;
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!enabled) return;

    const fetchProductCollection = async () => {
      setIsLoading(true);
      try {
        const response = await ProductService.getProducts(params);
        const mappedData = response.data.map(mapProductCardData);
        setProducts(mappedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductCollection();
  }, [enabled, JSON.stringify(params)]);

  return { products, isLoading };
};
