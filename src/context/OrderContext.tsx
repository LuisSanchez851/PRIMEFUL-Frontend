//src/context/OrderContext.tsx
import { createContext, useContext } from "react";
import { useOrders } from "../hooks/useOrders";
import type { Order } from "../types/order";
import type { Cart } from "../types/cart";

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  createOrder: (cart: Cart) => Promise<Order>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const { orders, loading, create } = useOrders();

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        createOrder: create, // alias limpio
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within OrderProvider");
  }
  return context;
}
