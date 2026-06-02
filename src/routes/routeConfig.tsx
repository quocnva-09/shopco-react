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
        handle: {
          crumb: () => [{ label: "Product" }],
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
