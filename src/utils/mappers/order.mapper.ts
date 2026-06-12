import type { OrderApi, OrderItemApi, OrderProductApi, OrderProductImageApi } from "@/types/api/order.api";
import type { Order, OrderItem, OrderProduct, OrderProductImage } from "@/types/order";

export const mapOrderProductImageApiToModel = (api: OrderProductImageApi): OrderProductImage => ({
  id: api.id,
  imgPath: api.img_path,
});

export const mapOrderProductApiToModel = (api: OrderProductApi): OrderProduct => ({
  id: api.id,
  name: api.name,
  images: api.images.map(mapOrderProductImageApiToModel),
});

export const mapOrderItemApiToModel = (api: OrderItemApi): OrderItem => ({
  id: api.id,
  productVariantId: api.product_variant_id,
  productName: api.product_name,
  productVariantName: api.product_variant_name,
  quantity: api.quantity,
  price: api.price,
  totalMoney: api.totalMoney,
  product: mapOrderProductApiToModel(api.product),
});

export const mapOrderApiToOrder = (api: OrderApi): Order => ({
  id: api.id,
  userId: api.user_id,
  guestName: api.guest_name,
  guestPhone: api.guest_phone,
  guestEmail: api.guest_email,
  guestAddress: api.guest_address,
  status: api.status,
  totalAmount: api.totalAmount,
  deliveryFee: api.delivery_fee,
  discount: api.discount,
  createdAt: api.created_at,
  updatedAt: api.updated_at,
  items: api.items.map(mapOrderItemApiToModel),
});
