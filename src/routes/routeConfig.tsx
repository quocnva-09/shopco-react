// routes/routeConfig.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATHS } from "./paths";
import { homeLoader } from "@/pages/Home/loader";
import { productDetailLoader } from "@/pages/ProductDetail/loader";
import { categoryLoader } from "@/pages/Category/loader";

// pages
import { MainLayout } from "@/components/templates/MainLayout";
import { NotFoundPage } from "@/pages/NotFound";
import { RouteErrorBoundary } from "@/components/organisms/RouteErrorBoundary";

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
        errorElement: <RouteErrorBoundary />,
        children: [
          {
            index: true,
            loader: homeLoader,
            lazy: async () => {
              const { HomePage } = await import("@/pages/Home");
              return { Component: HomePage };
            },
          },
          {
            path: `${PATHS.CATEGORY}`,
            loader: categoryLoader,
            lazy: async () => {
              const { CategoryPage } = await import("@/pages/Category");
              return { Component: CategoryPage };
            },
          },
          {
            path: `${PATHS.PRODUCT}/:id`,
            loader: productDetailLoader,
            lazy: async () => {
              const { ProductDetailPage } =
                await import("@/pages/ProductDetail");
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
            path: PATHS.CHECKOUT,
            lazy: async () => {
              const { CheckOutPage, checkoutAction } =
                await import("@/pages/CheckOut");
              return { Component: CheckOutPage, action: checkoutAction };
            },
            handle: {
              crumb: () => [{ label: "Checkout" }],
            },
          },
          {
            path: `${PATHS.VERIFY_ORDER}/:orderId`,
            lazy: async () => {
              const { VerifyOrderPage, verifyOrderLoader, verifyOrderAction } =
                await import("@/pages/VerifyOrderPage");
              return {
                Component: VerifyOrderPage,
                loader: verifyOrderLoader,
                action: verifyOrderAction,
              };
            },
            handle: {
              crumb: () => [{ label: "Verify Order" }],
            },
          },
          {
            path: PATHS.ORDER_SUCCESS,
            lazy: async () => {
              const { OrderSuccessPage } = await import("@/pages/OrderSuccess");
              return { Component: OrderSuccessPage };
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
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
