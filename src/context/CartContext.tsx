//src/context/CartContext.tsx
import { createContext, useContext } from "react";
import { useCart } from "../hooks/useCart";
import type { Cart } from "../types/cart";
import type { CartItemProduct } from "../types/cart";


interface CartContextType {
  cart: Cart;
  loading: boolean;
  addToCart: (product: CartItemProduct, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const {
    cart,
    loading,
    addProduct,
    removeProduct,
    clear,
  } = useCart();

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart: addProduct,
        removeFromCart: removeProduct,
        clearCart: clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
}
