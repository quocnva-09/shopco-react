import { get } from "@/lib/axiosClient";
import { API_ENDPOINTS } from "@/consts/api";
import type {
  CategoriesResponse,
  ColorsResponse,
  SizesResponse,
  StylesResponse,
} from "@/types/api/master-data.api";

export const MasterDataService = {
  getCategories: async (is_root?: boolean) => {
    return get<CategoriesResponse>(API_ENDPOINTS.CATEGORIES, {
      params: { is_root },
    });
  },

  getColors: async () => {
    return get<ColorsResponse>(API_ENDPOINTS.COLORS);
  },

  getSizes: async () => {
    return get<SizesResponse>(API_ENDPOINTS.SIZES);
  },

  getStyles: async () => {
    return get<StylesResponse>(API_ENDPOINTS.STYLES);
  },
};
