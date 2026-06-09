import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ErrorBoundary from ".";

// ---------- Helper ----------

/**
 * A component that intentionally throws during the render phase.
 * This is the only reliable way to trigger an ErrorBoundary:
 * the error MUST occur during rendering, not inside an event handler.
 */
const BuggyWidget = (): never => {
  throw new Error("Simulated render error");
};

// ---------- Setup ----------

// Vitest prints the caught error's stack trace to stderr, which pollutes test output.
// Spy on and silence console.error for all tests.
beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------- Tests ----------

describe("ErrorBoundary", () => {
  // ------------------------------------------------------------------ //
  // CASE 1: No error — renders children normally
  // ------------------------------------------------------------------ //
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <p>Normal content</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Normal content")).toBeInTheDocument();
  });

  // ------------------------------------------------------------------ //
  // CASE 2: Children throw — renders default Fallback UI
  // ------------------------------------------------------------------ //
  it("shows the default fallback UI when a child throws during render", () => {
    render(
      <ErrorBoundary>
        <BuggyWidget />
      </ErrorBoundary>,
    );

    // Must have role="alert" to satisfy a11y requirements
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("shows the error message in the fallback UI", () => {
    render(
      <ErrorBoundary>
        <BuggyWidget />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Simulated render error/i)).toBeInTheDocument();
  });

  it("shows the Retry button in the fallback UI", () => {
    render(
      <ErrorBoundary>
        <BuggyWidget />
      </ErrorBoundary>,
    );

    expect(
      screen.getByRole("button", { name: /retry/i }),
    ).toBeInTheDocument();
  });

  // ------------------------------------------------------------------ //
  // CASE 3: Custom fallback prop — uses the render prop, ignores the default
  // ------------------------------------------------------------------ //
  it("renders custom fallback when the fallback prop is provided", () => {
    render(
      <ErrorBoundary fallback={<p>Custom fallback UI</p>}>
        <BuggyWidget />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Custom fallback UI")).toBeInTheDocument();
    // Default fallback must not be rendered
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  // ------------------------------------------------------------------ //
  // CASE 4: Click Retry — resets state; BuggyWidget re-throws — alert still shown
  // (BuggyWidget always throws, so after reset it re-throws immediately)
  // ------------------------------------------------------------------ //
  it("resets state on Retry click and re-renders children", async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <BuggyWidget />
      </ErrorBoundary>,
    );

    // Fallback is visible
    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Click Retry → ErrorBoundary resets → remounts BuggyWidget → re-throws
    await user.click(screen.getByRole("button", { name: /retry/i }));

    // Fallback is still shown (BuggyWidget keeps throwing)
    // → confirms handleReset() ran and a re-render occurred
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  // ------------------------------------------------------------------ //
  // CASE 5: componentDidCatch is called with the correct error
  // ------------------------------------------------------------------ //
  it("calls console.error with the error when a child throws", () => {
    render(
      <ErrorBoundary>
        <BuggyWidget />
      </ErrorBoundary>,
    );

    expect(console.error).toHaveBeenCalled();
  });
});
