// src/hooks/useOrders.ts
import { useState } from "react";
import type { Cart } from "../types/cart";
import type { Order } from "../types/order";
import {
  createOrder,
  getOrders,
  getOrderById,
  changeOrderStatus,
} from "../services/order.service";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadOrders() {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  }

  async function create(cart: Cart) {
    setLoading(true);
    const order = await createOrder(cart);
    setOrders((prev) => [...prev, order]);
    setLoading(false);
    return order;
  }

  async function getById(id: string) {
    return await getOrderById(id);
  }

  async function updateStatus(
    orderId: string,
    status: Order["status"]
  ) {
    setLoading(true);
    const updated = await changeOrderStatus(orderId, status);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? updated : o))
    );
    setLoading(false);
    return updated;
  }

  return {
    orders,
    loading,
    loadOrders,
    create,
    getById,
    updateStatus,
  };
}
