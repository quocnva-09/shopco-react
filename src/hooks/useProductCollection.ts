import { ProductService } from "@/services/product.service";
import type { ProductParams } from "@/types/api/product.api";
import type { ProductCardData } from "@/types/product";
import { isRetryableErrorKind } from "@/consts/errorKinds";
import { isApiError } from "@/utils/ApiError";
import { mapProductCardData } from "@/utils/mappers/product.mapper";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_ERROR_MESSAGE } from "@/consts/errorCodes";

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
  const [error, setError] = useState<string | null>(null);
  const [isRetryable, setIsRetryable] = useState<boolean>(false);

  const fetchProductCollection = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ProductService.getProducts(params);
      const mappedData = response.data.map(mapProductCardData);
      setProducts(mappedData);
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
  }, [JSON.stringify(params)]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!enabled) return;
    fetchProductCollection();
  }, [enabled, fetchProductCollection]);

  return {
    products,
    isLoading,
    error,
    isRetryable,
    retry: fetchProductCollection,
  };
};
