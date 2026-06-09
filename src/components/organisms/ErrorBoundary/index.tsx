import { Component, type ErrorInfo, type ReactNode } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import "./index.scss";
import { DEFAULT_ERROR_MESSAGE } from "@/consts/errorCodes";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
    this.handleReset = this.handleReset.bind(this);
  }

  // Update state when an error occurs
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // Log error
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("The error:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  /** Reset ErrorBoundary  */
  handleReset(): void {
    this.setState({ hasError: false, error: null });
  }

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback, className } = this.props;

    if (hasError) {
      if (fallback !== undefined) return fallback;

      return (
        <div
          role="alert"
          aria-live="assertive"
          className={clsx("error-boundary", className)}
        >
          <Heading as="h2" lineClamp={1} className="error-boundary__title">
            {DEFAULT_ERROR_MESSAGE}
          </Heading>

          {error && (
            <div className="error-boundary__detail">
              <Text as="p">
                <strong>Detail:</strong> {error.message}
              </Text>
            </div>
          )}

          <div className="error-boundary__actions">
            <Button
              colorScheme="danger"
              variant="solid"
              onClick={this.handleReset}
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
export { ErrorBoundary };
