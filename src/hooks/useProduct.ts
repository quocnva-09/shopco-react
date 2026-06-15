import { useCallback, useEffect } from "react";
import { ProductService } from "@/services/product.service";
import { mapProductData } from "@/utils/mappers/product.mapper";
import { useAsync } from "@/hooks/useAsync";
import type { ProductData } from "@/types/product";

export const useProduct = (id: number) => {
  const fetcher = useCallback(
    () =>
      ProductService.getProductById(id).then((r) => mapProductData(r.data)),
    [id],
  );

  const { data: product, execute, ...rest } = useAsync<ProductData>(fetcher);

  useEffect(() => {
    execute();
  }, [execute]);

  return { product, retry: execute, ...rest };
};

