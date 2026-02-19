// src/services/order.service.ts
import type { Cart } from "../types/cart";
import type { Order } from "../types/order";
import {
  createOrderFromCart,
  updateOrderStatus,
} from "../domain/order/order.utils";

// Simulación de persistencia en memoria
let orders: Order[] = [];

/**
 * Crea una nueva orden a partir del carrito
 */
export async function createOrder(cart: Cart): Promise<Order> {
  const order = createOrderFromCart(cart);
  orders.push(order);
  return Promise.resolve(order);
}

/**
 * Obtiene todas las órdenes
 */
export async function getOrders(): Promise<Order[]> {
  return Promise.resolve(orders);
}

/**
 * Obtiene una orden por ID
 */
export async function getOrderById(
  id: string
): Promise<Order | undefined> {
  return Promise.resolve(orders.find((o) => o.id === id));
}

/**
 * Actualiza el estado de una orden
 */
export async function changeOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<Order> {
  const orderIndex = orders.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    throw new Error("Order not found");
  }

  const updatedOrder = updateOrderStatus(orders[orderIndex], status);
  orders[orderIndex] = updatedOrder;

  return Promise.resolve(updatedOrder);
}
