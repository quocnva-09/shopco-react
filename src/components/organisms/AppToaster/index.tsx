import { Toaster } from "react-hot-toast";
import { TOAST_DEFAULT_DURATION } from "@/consts/config";
import "./index.scss";

/**
 * Global toast notification container.
 * Mount once at the app root — all `toast.*()` calls render here.
 *
 * Styling is fully managed via AppToaster.scss (BEM classes).
 * Only icon theme colors are kept as props (react-hot-toast limitation).
 */
export const AppToaster = () => (
  <Toaster
    position="top-right"
    containerClassName="app-toaster"
    toastOptions={{
      duration: TOAST_DEFAULT_DURATION,
      className: "toast",
      error: {
        className: "toast toast--error",
        iconTheme: {
          primary: "#ff3333", // $danger-color
          secondary: "#fff",
        },
      },
      success: {
        className: "toast toast--success",
      },
    }}
  />
);
