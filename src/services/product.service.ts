import { get } from "@/lib/axiosClient";
import type {
  ProductParams,
  ProductListResponse,
  ProductResponse,
} from "@/types/api/product.api";
import { API_ENDPOINTS } from "@/consts/api";

export const ProductService = {
  /**
   * Fetch a list of products with optional query parameters
   */
  getProducts: async (params?: ProductParams): Promise<ProductListResponse> => {
    return get<ProductListResponse>(API_ENDPOINTS.PRODUCTS, { params });
  },

  getProductById: async (id: number): Promise<ProductResponse> => {
    return get<ProductResponse>(API_ENDPOINTS.PRODUCT_BY_ID(id));
  },
};
