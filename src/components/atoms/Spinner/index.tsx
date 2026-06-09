import clsx from "clsx";
import "./index.scss";

export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerColor = "inherit" | "white";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
  className?: string;
}

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~125.66

export const Spinner = ({
  size = "md",
  color = "inherit",
  label = "Loading...",
  className,
}: SpinnerProps) => (
  <span
    role="status"
    aria-label={label}
    className={clsx(
      "spinner",
      `spinner--${size}`,
      `spinner--${color}`,
      className,
    )}
  >
    <svg
      className="spinner__svg"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="spinner__track"
        cx="24"
        cy="24"
        r={RADIUS}
        strokeWidth="inherit"
        strokeDasharray={CIRCUMFERENCE}
      />
      <circle
        className="spinner__fill"
        cx="24"
        cy="24"
        r={RADIUS}
        strokeWidth="inherit"
        strokeDasharray={CIRCUMFERENCE}
      />
    </svg>
  </span>
);
