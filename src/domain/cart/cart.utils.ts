// src/domain/cart/cart.utils.ts
import type { Product } from "../../types/product";
import type { CartItem, Cart } from "../../types/cart";

/**
 * Agrega un producto al carrito
 */
export function addToCart(
  items: CartItem[],
  product: Product,
  quantity: number = 1
): CartItem[] {
  const existingItem = items.find(
    (item) => item.product.id === product.id
  );

  if (existingItem) {
    return items.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [...items, { product, quantity }];
}

/**
 * Remueve un producto del carrito
 */
export function removeFromCart(
  items: CartItem[],
  productId: string
): CartItem[] {
  return items.filter((item) => item.product.id !== productId);
}

/**
 * Actualiza la cantidad de un producto
 */
export function updateItemQuantity(
  items: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(items, productId);
  }

  return items.map((item) =>
    item.product.id === productId
      ? { ...item, quantity }
      : item
  );
}

/**
 * Recalcula totales del carrito
 */
export function recalculateCart(items: CartItem[]): Cart {
  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return {
    items,
    totalItems,
    totalPrice,
  };
}
