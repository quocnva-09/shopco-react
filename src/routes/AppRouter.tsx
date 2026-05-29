// routes/AppRouter.tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./routeConfig";

export function AppRouter() {
  return <RouterProvider router={router} />;
}
