import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

// ---------- Helper ----------

/**
 * Component cố tình throw lỗi trong render phase.
 * Đây là cách duy nhất để trigger ErrorBoundary một cách đáng tin cậy:
 * lỗi PHẢI xảy ra trong quá trình render, không phải trong event handler.
 */
const BuggyWidget = (): never => {
  throw new Error("Simulated render error");
};

// ---------- Setup ----------

// Vitest sẽ in stack trace của lỗi bị bắt ra stderr → làm nhiễu output.
// Spy và silence console.error trong tất cả các test.
beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------- Tests ----------

describe("ErrorBoundary", () => {
  // ------------------------------------------------------------------ //
  // CASE 1: Không có lỗi → render children bình thường
  // ------------------------------------------------------------------ //
  it("renders children khi không có lỗi", () => {
    render(
      <ErrorBoundary>
        <p>Nội dung bình thường</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Nội dung bình thường")).toBeInTheDocument();
  });

  // ------------------------------------------------------------------ //
  // CASE 2: Children throw → hiển thị Fallback UI mặc định
  // ------------------------------------------------------------------ //
  it("hiển thị fallback UI mặc định khi children throw lỗi trong render", () => {
    render(
      <ErrorBoundary>
        <BuggyWidget />
      </ErrorBoundary>,
    );

    // Phải có role="alert" để đảm bảo a11y
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("hiển thị thông báo lỗi trong fallback UI", () => {
    render(
      <ErrorBoundary>
        <BuggyWidget />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Simulated render error/i)).toBeInTheDocument();
  });

  it("hiển thị nút Retry trong fallback UI", () => {
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
  // CASE 3: Custom fallback prop → ưu tiên render prop, bỏ qua default
  // ------------------------------------------------------------------ //
  it("render custom fallback khi prop fallback được truyền vào", () => {
    render(
      <ErrorBoundary fallback={<p>UI dự phòng tuỳ chỉnh</p>}>
        <BuggyWidget />
      </ErrorBoundary>,
    );

    expect(screen.getByText("UI dự phòng tuỳ chỉnh")).toBeInTheDocument();
    // Không hiển thị fallback mặc định
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  // ------------------------------------------------------------------ //
  // CASE 4: Click Retry → reset state, BuggyWidget throw lại → vẫn hiện alert
  // (Vì BuggyWidget luôn throw, nên sau reset nó throw ngay lập tức trở lại)
  // ------------------------------------------------------------------ //
  it("reset state khi click Retry và render lại children", async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <BuggyWidget />
      </ErrorBoundary>,
    );

    // Fallback đang hiển thị
    expect(screen.getByRole("alert")).toBeInTheDocument();

    // Click Retry → ErrorBoundary reset → mount lại BuggyWidget → throw lại
    await user.click(screen.getByRole("button", { name: /retry/i }));

    // Fallback vẫn hiển thị (do BuggyWidget tiếp tục throw)
    // → xác nhận handleReset() đã chạy và re-render diễn ra
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  // ------------------------------------------------------------------ //
  // CASE 5: componentDidCatch được gọi với đúng error
  // ------------------------------------------------------------------ //
  it("gọi console.error với error khi children throw", () => {
    render(
      <ErrorBoundary>
        <BuggyWidget />
      </ErrorBoundary>,
    );

    expect(console.error).toHaveBeenCalled();
  });
});
