import { ProductService } from "@/services/product.service";
import { mapProductData } from "@/utils/mappers/product.mapper";
import type { LoaderFunctionArgs } from "react-router-dom";
import type { ProductData } from "@/types/product";
import { API_ERROR_MESSAGES, HTTP_STATUS } from "@/consts/errorCodes";

export interface ProductDetailLoaderData {
  product: Promise<ProductData>;
}

export const productDetailLoader = ({
  params,
}: LoaderFunctionArgs): ProductDetailLoaderData => {
  if (!params.id) {
    throw new Response(API_ERROR_MESSAGES[HTTP_STATUS.NOT_FOUND], {
      status: HTTP_STATUS.NOT_FOUND,
    });
  }

  const product = ProductService.getProductById(Number(params.id)).then(
    (response) => mapProductData(response.data),
  );

  return { product };
};
