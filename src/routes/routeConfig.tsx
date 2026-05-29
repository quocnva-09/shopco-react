// routes/routeConfig.tsx
import { createBrowserRouter } from "react-router-dom";
import { PATHS } from "./paths";

// pages
import { MainLayout } from "@/components/templates/MainLayout";
import { HomePage } from "@/pages/Home";
import { ProductDetailPage } from "@/pages/ProductDetail";
import { CartPage } from "@/pages/Cart";

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATHS.PRODUCT_DETAIL,
        element: <ProductDetailPage />,
      },
      {
        path: PATHS.CART,
        element: <CartPage />,
      },
    ],
  },
]);
