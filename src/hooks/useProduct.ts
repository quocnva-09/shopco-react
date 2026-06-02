import { useEffect, useState } from "react";
import { ProductService } from "@/services/product.service";
import type { ProductData } from "@/types/product";
import { mapProductData } from "@/utils/mappers/product.mapper";

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<ProductData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await ProductService.getProductById(Number(id));
        const mappedData = mapProductData(response.data);
        setProduct(mappedData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return { product, isLoading };
};
