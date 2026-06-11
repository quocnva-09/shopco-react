import type { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import "./index.scss";

type SectionStateWrapperProps = {
  error?: string | null;
  isRetryable?: boolean;
  onRetry?: () => void;
  children: ReactNode;
};

/**
 * Wraps a section with render states:
 * - `error`     → centered error message + optional retry button
 * - default     → renders children
 */
export const SectionStateWrapper = ({
  error,
  isRetryable = false,
  onRetry,
  children,
}: SectionStateWrapperProps) => {

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

