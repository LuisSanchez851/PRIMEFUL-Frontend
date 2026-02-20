// src/hooks/useCart.ts
import { useEffect, useState } from "react";
import type { Cart, CartItemProduct } from "../types/cart";
import type { Product } from "../types/product";
import {
  getCart,
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCart,
} from "../services/cart.service";

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCart() {
      const currentCart = await getCart();
      setCart(currentCart);
      setLoading(false);
    }

    loadCart();
  }, []);

async function addProduct(product: CartItemProduct, quantity = 1) {
  const updatedCart = await addProductToCart(product, quantity);
  setCart(updatedCart);
}

  async function removeProduct(productId: string) {
    const updatedCart = await removeProductFromCart(productId);
    setCart(updatedCart);
  }

  async function updateQuantity(productId: string, quantity: number) {
    const updatedCart = await updateProductQuantity(productId, quantity);
    setCart(updatedCart);
  }

  async function clear() {
    const emptyCart = await clearCart();
    setCart(emptyCart);
  }

  return {
    cart,
    loading,
    itemCount: cart.totalItems,
    totalPrice: cart.totalPrice,
    addProduct,
    removeProduct,
    updateQuantity,
    clear,
  };
}
