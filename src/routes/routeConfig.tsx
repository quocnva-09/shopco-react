// routes/routeConfig.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATHS } from "./paths";

// pages
import { MainLayout } from "@/components/templates/MainLayout";
import { NotFoundPage } from "@/pages/NotFound";
import { RouteErrorBoundary } from "@/components/organisms/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <MainLayout />,
    errorElement: <RouteErrorBoundary />,
    HydrateFallback: () => null,
    handle: {
      crumb: () => [{ label: "Home", href: PATHS.HOME }],
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { HomePage } = await import("@/pages/Home");
          return { Component: HomePage };
        },
      },
      {
        path: `${PATHS.PRODUCT}/:id`,
        lazy: async () => {
          const { ProductDetailPage } = await import("@/pages/ProductDetail");
          return { Component: ProductDetailPage };
        },
        handle: {
          crumb: () => [{ label: "Product" }],
        },
      },

      {
        path: PATHS.CART,
        lazy: async () => {
          const { CartPage } = await import("@/pages/Cart");
          return { Component: CartPage };
        },
        handle: {
          crumb: () => [{ label: "Cart" }],
        },
      },
      {
        path: PATHS.PRODUCT,
        element: <Navigate to={PATHS.HOME} replace />,
      },
      {
        path: "*",
        lazy: async () => {
          const { NotFoundPage } = await import("@/pages/NotFound");
          return { Component: NotFoundPage };
        },
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
