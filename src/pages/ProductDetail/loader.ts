import { ProductService } from "@/services/product.service";
import { mapProductData } from "@/utils/mappers/product.mapper";
import type { LoaderFunctionArgs } from "react-router-dom";
import type { ProductData } from "@/types/product";

export interface ProductDetailLoaderData {
  product: Promise<ProductData>;
}

export const productDetailLoader = ({ params }: LoaderFunctionArgs): ProductDetailLoaderData => {
  if (!params.id) {
    throw new Response("Not Found", { status: 404 });
  }

  const product = ProductService.getProductById(Number(params.id)).then(
    (response) => mapProductData(response.data),
  );

  return { product };
};
