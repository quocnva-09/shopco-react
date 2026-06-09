import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import "./index.scss";

type SectionStateWrapperProps = {
  isLoading: boolean;
  loadingMessage?: string;
  error?: string | null;
  isRetryable?: boolean;
  onRetry?: () => void;
  children: ReactNode;
};

/**
 * Wraps a section with three render states:
 * - `isLoading` → centered loading message
 * - `error`     → centered error message + optional retry button
 * - default     → renders children
 */
export const SectionStateWrapper = ({
  isLoading,
  loadingMessage = "Loading...",
  error,
  isRetryable = false,
  onRetry,
  children,
}: SectionStateWrapperProps) => {
  if (isLoading) {
    return (
      <div className="section-state">
        <p className="section-state__message">{loadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-state">
        <p className="section-state__message section-state__message--error">
          {error}
        </p>
        {isRetryable && onRetry && (
          <Button
            variant="outline"
            colorScheme="dark"
            className="section-state__retry-btn"
            onClick={onRetry}
          >
            Try again
          </Button>
        )}
      </div>
    );
  }

  return <>{children}</>;
};

