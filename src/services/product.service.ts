import { get } from "@/lib/axios";
import type {
  ProductParams,
  ProductListResponse,
  ProductResponse,
} from "@/types/api/product.api";

export const ProductService = {
  /**
   * Fetch a list of products with optional query parameters
   */
  getProducts: async (params?: ProductParams): Promise<ProductListResponse> => {
    return get<ProductListResponse>("/products", { params });
  },

  getProductById: async (id: number): Promise<ProductResponse> => {
    return get<ProductResponse>(`/products/${id}`);
  },
};
