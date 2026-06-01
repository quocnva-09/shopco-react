// routes/routeConfig.tsx
import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";

// pages
import { MainLayout } from "@/components/templates/MainLayout";
import { HomePage } from "@/pages/Home";
import { ProductDetailPage } from "@/pages/ProductDetail";
import { CartPage } from "@/pages/Cart";
import { MOCK_PRODUCT_DETAIL } from "@/consts/productDetailData";

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <MainLayout />,
    handle: {
      crumb: () => [{ label: "Home", href: PATHS.HOME }],
    },
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: `${PATHS.PRODUCT_DETAIL}/:id`,
        element: <ProductDetailPage />,
        loader: () => {
          return MOCK_PRODUCT_DETAIL;
        },
        handle: {
          crumb: (data: typeof MOCK_PRODUCT_DETAIL) => [
            { label: "Product", href: PATHS.PRODUCT_DETAIL },
            { label: data?.name || "Product Detail" },
          ],
        },
      },
      {
        path: PATHS.CART,
        element: <CartPage />,
        handle: {
          crumb: () => [{ label: "Cart" }],
        },
      },
    ],
  },
]);
