# Guest Checkout OTP Verification Flow API Documentation

This document provides a complete guide for the Frontend (React) team to integrate the secure Guest Checkout flow. It includes the API specifications, the expected workflow, and state management recommendations.

> [!NOTE]
> All endpoints are prefixed with `/api` and expect headers `Accept: application/json` and `Content-Type: application/json`.

---

## 1. Guest Checkout Endpoint

Creates a new order for an unauthenticated user. The order is initially created with a `not_verify` status, and a 6-digit OTP is generated and emailed to the guest.

- **URL:** `/api/guest/orders/checkout`
- **Method:** `POST`
- **Rate Limit:** 30 requests per minute

### Request Body

```json
{
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "product_variant_id": 2,
      "color_id": 1,
      "size_id": 3
    }
  ],
  "delivery_fee": 30000,
  "discount": 10000,
  "guest_name": "Nguyen Van A",
  "guest_phone": "0901234567",
  "guest_email": "guest@example.com",
  "guest_address": "123 Nguyen Trai, HCM"
}
```

> [!TIP]
> For the `items` array, you can either provide `product_variant_id` directly (Mode 1) OR provide `color_id` and `size_id` (Mode 2) and the backend will automatically resolve the variant.

### Response

**Success (201 Created)**

```json
{
  "status": 201,
  "message": "Order placed successfully",
  "data": {
    "id": 1,
    "user_id": 3,
    "guest_name": "Nguyen Van A",
    "guest_phone": "0901234567",
    "guest_email": "guest@example.com",
    "guest_address": "123 Nguyen Trai",
    "status": "pending",
    "totalAmount": 450000,
    "delivery_fee": 30000,
    "discount": 10000,
    "created_at": "2024-01-15 10:30:00",
    "updated_at": "2024-01-15 12:00:00",
    "items": [
      {
        "id": 1,
        "product_variant_id": 2,
        "product_name": "Classic T-Shirt",
        "product_variant_name": "Red / M",
        "quantity": 2,
        "price": 150000,
        "totalMoney": 300000,
        "product": {
          "id": 7,
          "name": "Classic T-Shirt",
          "images": [
            {
              "id": 1,
              "img_path": "https://example.com/images/shirt.jpg"
            }
          ]
        }
      }
    ]
  }
}
```

**Validation Error (422 Unprocessable Entity)**

```json
{
  "status": 422,
  "message": "The guest email format is invalid."
}
```

---

## 2. Verify OTP Endpoint

Validates the 6-digit OTP sent to the user's email. On success, the order status transitions from `not_verify` to `pending`.

- **URL:** `/api/guest/orders/{order_id}/verify-otp`
- **Method:** `POST`
- **Rate Limit:** 5 requests per minute _(Aggressive throttling to prevent brute-force attacks)_

### Request Parameters

| Parameter  | Type    | In   | Description                                             |
| :--------- | :------ | :--- | :------------------------------------------------------ |
| `order_id` | integer | path | The ID of the order returned from the checkout endpoint |

### Request Body

```json
{
  "otp": "123456"
}
```

### Response

**Success (200 OK)**

```json
{
  "status": 200,
  "message": "OTP verified successfully."
}
```

**Error (400 Bad Request)**
Returned when the OTP is incorrect, expired (past 5 minutes), or the order has already been verified/cancelled.

```json
{
  "status": 400,
  "message": "Invalid or expired OTP."
}
```

---

## 3. Resend OTP Endpoint

Generates a fresh 6-digit OTP and resends it to the guest's email. The previous OTP becomes invalid, and the 5-minute TTL timer resets.

- **URL:** `/api/guest/orders/{order_id}/resend-otp`
- **Method:** `POST`
- **Rate Limit:** 3 requests per minute

### Request Parameters

| Parameter  | Type    | In   | Description         |
| :--------- | :------ | :--- | :------------------ |
| `order_id` | integer | path | The ID of the order |

### Request Body

_None_

### Response

**Success (200 OK)**

```json
{
  "status": 200,
  "message": "OTP resent successfully."
}
```

**Error (400 Bad Request)**

```json
{
  "status": 400,
  "message": "Order is already verified or cancelled."
}
```

---

## Frontend Integration Workflow & Best Practices

1. **Checkout Submission:**
   Gather user info and cart items -> POST to `/checkout`.
   On `201`, extract the `data.id` (`order_id`) and safely navigate the user to the OTP Verification Route (e.g., `/verify-order/:orderId`).
2. **OTP Verification:**
   Prompt the user to enter the 6-digit code.
   - When the user submits, call `/verify-otp`.
   - **Success:** Navigate to the `/order-success` screen.
   - **Error (400):** Display an inline error ("Invalid or expired OTP") under the input field. Do not navigate away.
   - **Throttling (429):** If the user hits the rate limit (5 attempts/min), show a message like "Too many attempts. Please wait 1 minute."

3. **Resend OTP & Cooldown:**
   - On the verification page, include a "Resend OTP" button.
   - **CRITICAL:** When the component mounts, or when the user clicks "Resend", start a frontend countdown timer (e.g., 60 seconds) and **disable** the Resend button until the timer reaches zero. This perfectly mirrors the backend `throttle:3,1` limit and provides good UX.
   - If the user clicks Resend (when active), call `/resend-otp` and reset the frontend cooldown timer.

> [!IMPORTANT]
> Because `not_verify` orders exist in the database, if the user abandons the page without verifying, the order will simply sit as `not_verify` and will never be fulfilled. The Frontend does not need to handle abandoned order cleanup; the backend can run a cron job to prune stale `not_verify` orders later.
