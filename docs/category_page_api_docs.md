# Category Page API Documentation

Tài liệu này mô tả danh sách các API cần thiết để render trang Category (Frontend React), bao gồm việc gọi các Master Data để hiển thị bộ lọc (Filters) và gọi API danh sách sản phẩm (Products) kèm các tiêu chí lọc, sắp xếp.

---

## 1. Master Data APIs

Các API này nên được gọi 1 lần khi khởi tạo trang (hoặc cache lại trên Frontend) để hiển thị danh sách các tùy chọn bên trong Sidebar Filter.

### 1.1. Lấy danh sách Categories
- **Endpoint:** `GET /api/categories`
- **Query Params:** 
  - `is_root` (boolean, optional): Set thành `true` nếu chỉ muốn lấy danh mục cha.
- **Response:**
  ```json
  {
    "status": 200,
    "message": "Categories retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "T-shirt",
        "slug": "t-shirt",
        ...
      }
    ]
  }
  ```

### 1.2. Lấy danh sách Colors
- **Endpoint:** `GET /api/colors`
- **Response:**
  ```json
  {
    "status": 200,
    "message": "Colors retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "Red",
        "hex_code": "#FF0000"
      }
    ]
  }
  ```

### 1.3. Lấy danh sách Sizes
- **Endpoint:** `GET /api/sizes`
- **Response:**
  ```json
  {
    "status": 200,
    "message": "Sizes retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "M",
        "label": "Medium"
      }
    ]
  }
  ```

### 1.4. Lấy danh sách Styles
- **Endpoint:** `GET /api/styles`
- **Response:**
  ```json
  {
    "status": 200,
    "message": "Styles retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "Casual",
        "slug": "casual"
      }
    ]
  }
  ```

---

## 2. Product Filter API

API dùng để lấy danh sách sản phẩm theo các tiêu chí được chọn từ Sidebar Filter và Sort Dropdown. 

### 2.1. Lọc và Sắp xếp Sản phẩm
- **Endpoint:** `GET /api/products`
- **Query Params (Tất cả đều là optional):**
  
  **Bộ lọc (Filters):**
  - `category_slug` (string): Slug của danh mục (Ví dụ: `t-shirt`).
  - `colors[]` (array of strings): Mảng tên các màu (Ví dụ: `colors[]=Red&colors[]=Blue`).
  - `sizes[]` (array of strings): Mảng tên kích thước (Ví dụ: `sizes[]=M&sizes[]=L`).
  - `style_slugs[]` (array of strings): Mảng slug của style (Ví dụ: `style_slugs[]=casual&style_slugs[]=party`).
  - `min_price` (integer): Giá tối thiểu.
  - `max_price` (integer): Giá tối đa.

  **Sắp xếp (Sorting):** 
  - `sort_by` (string): Trường cần sắp xếp. Hỗ trợ: `created_at` (New Arrivals), `price` (Giá), `selling` (Bán chạy nhất/Most Popular).
  - `sort_dir` (string): Hướng sắp xếp (`asc` hoặc `desc`).

  > **Mapping Logic cho Sort Dropdown trên Frontend:**
  > - **Most Popular:** `sort_by=selling&sort_dir=desc`
  > - **New Arrivals:** `sort_by=created_at&sort_dir=desc`
  > - **Price: Low to High:** `sort_by=price&sort_dir=asc`
  > - **Price: High to Low:** `sort_by=price&sort_dir=desc`

  **Phân trang (Pagination):**
  - `page` (integer): Trang hiện tại (Mặc định: 1).
  - `per_page` (integer): Số lượng sản phẩm trên 1 trang (Mặc định: 15).

- **Response:**
  ```json
  {
    "status": 200,
    "message": "Products retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "Gradient Graphic T-Shirt",
        "slug": "gradient-graphic-t-shirt",
        "price": 35,
        "price_discount": 29,
        "final_price": 24.85,
        "is_active": true,
        "rating_avg": 4.5,
        "reviews_count": 12,
        "sold_count": 50,
        "category": {
            "id": 1,
            "name": "T-shirt",
            "slug": "t-shirt"
        },
        "variants": [...],
        "styles": [...],
        "images": [...]
      }
    ],
    "meta": {
      "current_page": 1,
      "last_page": 5,
      "per_page": 15,
      "total": 75
    }
  }
  ```
