import { useCallback, useEffect } from "react";
import { ProductService } from "@/services/product.service";
import type { ProductParams } from "@/types/api/product.api";
import type { ProductCardData } from "@/types/product";
import { mapProductCardData } from "@/utils/mappers/product.mapper";
import { useAsync } from "@/hooks/useAsync";

type UseProductCollectionOptions = {
  enabled?: boolean;
};

export const useProductCollection = (
  params: ProductParams,
  options: UseProductCollectionOptions = {},
) => {
  const { enabled = true } = options;

  const fetcher = useCallback(
    () =>
      ProductService.getProducts(params).then((r) =>
        r.data.map(mapProductCardData),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(params)],
  );

  const { data, execute, ...rest } = useAsync<ProductCardData[]>(fetcher);
  const products = data ?? [];

  useEffect(() => {
    if (!enabled) return;
    execute();
  }, [enabled, execute]);

  return { products, retry: execute, ...rest };
};

