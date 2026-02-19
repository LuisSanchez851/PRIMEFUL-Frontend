//src/types/order.ts
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
}
