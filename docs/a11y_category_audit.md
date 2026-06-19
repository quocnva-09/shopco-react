# Accessibility & HTML5 Semantics Audit Report

**Target:** Category Page (`/category`)

## 1. Semantic Landscape
Trang Danh mục sản phẩm tuân thủ khá tốt luồng Semantic cơ bản (Header -> Main -> Footer). Trang sử dụng `<aside>` rất chuẩn xác cho khu vực Sidebar Filter. Khu vực phân trang (Pagination) và Breadcrumb cũng được định nghĩa đúng bằng thẻ `<nav>`. Tuy nhiên, trang đang tồn tại một số lỗi nghiêm trọng về cấu trúc ARIA và lồng ghép thẻ tương tác.

## 2. Landmark Map
- Header `(header.header)`
  - Nav `(nav.nav)`
  - Form `(form.search-bar)`
- Main `(main.category-page)`
  - Nav `(nav.breadcrumb)`
  - Aside `(aside.sidebar-filter)`
  - Header `(header.category-page__header)`
  - Nav `(nav.pagination-box)`
- Footer `(footer.footer)`
  - Form `(form.newsletter-form)`
  - Nav `(nav.footer-col)` (x4)

## 3. Semantic Violations (The "Hall of Shame")

### 3.1. ARIA Misplacement (Dropdown Trigger)
- **Vấn đề:** Do component `Dropdown.Trigger` đã được khôi phục về thẻ `<div>`, các thuộc tính truy cập như `aria-expanded` và `aria-haspopup` hiện đang nằm trên thẻ `<div>` bọc ngoài. Tuy nhiên, người dùng bàn phím sẽ `Tab` vào thẻ `<button>` con nằm bên trong. Do thẻ `<button>` con này không có ARIA attributes, Screen Reader sẽ chỉ đọc nó là "Button" chung chung, gây mất phương hướng cho người khiếm thị.
- **Vị trí:** Mọi nơi sử dụng `Dropdown.Trigger` (như Header, Category Sort, Reviews Sort).

### 3.2. Nested Interactive Elements (FilterHeader)
- **Vấn đề:** Component `FilterHeader` (phần tiêu đề của các nhóm filter như Colors, Size) đang sử dụng thẻ `<div>` với `role="button"`, `tabIndex={0}` và sự kiện `onClick`. Bên trong nó lại chứa một `IconButton` (kết xuất ra `<button>`). Việc lồng một `<button>` bên trong một thẻ có `role="button"` vi phạm nguyên tắc truy cập cơ bản (Interactive controls must not be nested).
- **Vị trí:** `src/components/molecules/FilterHeader/index.tsx`

### 3.3. Divitis (ProductGrid)
- **Vấn đề:** Danh sách các sản phẩm đang được bọc bởi thẻ `<div className="product-grid">`. Bởi vì đây là một tập hợp các item đồng cấp, nó nên được gom nhóm rõ ràng bằng thẻ semantic để tạo thành một khu vực nội dung độc lập.
- **Vị trí:** `src/components/organisms/ProductGrid/index.tsx`

## 4. Actionable Refactoring Steps

1. **Khắc phục Dropdown Trigger:** 
   Sử dụng pattern `asChild` (kết hợp `React.cloneElement` cẩn thận) để hợp nhất thẻ `<div>` bọc ngoài và `<button>` con thành một thẻ `<button>` duy nhất, hoặc thay đổi thiết kế component để truyền thẳng ARIA attributes vào thẻ `<button>` con.
2. **Sửa lỗi Nested Button (FilterHeader):** 
   Đổi thẻ `<div>` chứa `role="button"` thành một thẻ `<button>` thật sự, và **thay thế** thẻ `IconButton` bên trong bằng một thẻ `<span>` (hoặc SVG thuần) để hiển thị icon mũi tên (loại bỏ thẻ `<button>` con).
3. **Tối ưu Landmark (ProductGrid):** 
   Đổi `<div className="product-grid">` thành `<ul className="product-grid">` (và đổi các thẻ bọc ngoài `ProductCard` thành `<li>`), hoặc đổi thành `<section aria-label="Product Grid" className="product-grid">`.
