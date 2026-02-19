// src/domain/order/order.utils.ts
import type { Cart } from "../../types/cart";
import type { Order, OrderItem } from "../../types/order";

/**
 * Crea una orden a partir del carrito
 */
export function createOrderFromCart(cart: Cart): Order {
  const items: OrderItem[] = cart.items.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  return {
    id: crypto.randomUUID(),
    items,
    total: cart.totalPrice,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}

/**
 * Verifica si una orden puede cambiar de estado
 */
export function canTransitionOrderStatus(
  currentStatus: Order["status"],
  nextStatus: Order["status"]
): boolean {
  const allowedTransitions: Record<
    Order["status"],
    Order["status"][]
  > = {
    pending: ["paid", "cancelled"],
    paid: ["shipped"],
    shipped: [],
    cancelled: [],
  };

  return allowedTransitions[currentStatus].includes(nextStatus);
}

/**
 * Cambia el estado de una orden si es válido
 */
export function updateOrderStatus(
  order: Order,
  nextStatus: Order["status"]
): Order {
  if (!canTransitionOrderStatus(order.status, nextStatus)) {
    throw new Error(
      `Invalid order status transition from ${order.status} to ${nextStatus}`
    );
  }

  return {
    ...order,
    status: nextStatus,
  };
}
