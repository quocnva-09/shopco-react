import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { DEFAULT_ERROR_MESSAGE } from "@/consts/errorCodes";
import "./ErrorBoundary.scss";

interface RouteErrorBoundaryProps {
  className?: string;
}

/**
 * Error boundary for React Router v6 Data Router (createBrowserRouter).
 * Must be used as `errorElement` prop on route config — cannot be an outer wrapper
 * because RouterProvider intercepts render errors before they bubble up.
 */
function RouteErrorBoundary({ className }: RouteErrorBoundaryProps) {
  const error = useRouteError();
  const navigate = useNavigate();

  let message = DEFAULT_ERROR_MESSAGE;

  if (isRouteErrorResponse(error)) {
    // Router-level errors (404, 403, etc.)
    message = error.statusText || `Error ${error.status}`;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  const handleReset = () => {
    navigate(0); // Reload current route
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={clsx("error-boundary", className)}
    >
      <Heading as="h2" lineClamp={1} className="error-boundary__title">
        {DEFAULT_ERROR_MESSAGE}
      </Heading>

      <div className="error-boundary__detail">
        <Text as="p">
          <strong>Detail:</strong> {message}
        </Text>
      </div>

      <div className="error-boundary__actions">
        <Button colorScheme="danger" variant="solid" onClick={handleReset}>
          Retry
        </Button>
      </div>
    </div>
  );
}

export default RouteErrorBoundary;
