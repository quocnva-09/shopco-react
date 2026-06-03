import { useCallback, useEffect, useState } from "react";
import { ProductService } from "@/services/product.service";
import { isRetryableErrorKind } from "@/consts/errorKinds";
import { DEFAULT_ERROR_MESSAGE } from "@/consts/errorCodes";
import { isApiError } from "@/utils/ApiError";
import type { ProductData } from "@/types/product";
import { mapProductData } from "@/utils/mappers/product.mapper";

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<ProductData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetryable, setIsRetryable] = useState<boolean>(false);

  const fetchProduct = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ProductService.getProductById(Number(id));
      const mappedData = mapProductData(response.data);
      setProduct(mappedData);
    } catch (err) {
      if (isApiError(err)) {
        setError(err.uiMessage);
        setIsRetryable(isRetryableErrorKind(err.kind));
      } else {
        setError(DEFAULT_ERROR_MESSAGE);
        setIsRetryable(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, isLoading, error, isRetryable, retry: fetchProduct };
};
