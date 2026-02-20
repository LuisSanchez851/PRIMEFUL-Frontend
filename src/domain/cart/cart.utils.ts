// src/domain/cart/cart.utils.ts
import type { CartItem, Cart, CartItemProduct } from "../../types/cart";
/**
 * Agrega un producto (variante específica) al carrito
 */
export function addToCart(
  items: CartItem[],
  product: CartItemProduct,
  quantity: number = 1
): CartItem[] {
  const existingItem = items.find(
    (item) => item.product.variantId === product.variantId
  );

  if (existingItem) {
    return items.map((item) =>
      item.product.variantId === product.variantId
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [...items, { product, quantity }];
}

/**
 * Remueve una variante específica del carrito
 */
export function removeFromCart(
  items: CartItem[],
  variantId: string
): CartItem[] {
  return items.filter(
    (item) => item.product.variantId !== variantId
  );
}

/**
 * Actualiza la cantidad de una variante específica
 */
export function updateItemQuantity(
  items: CartItem[],
  variantId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(items, variantId);
  }

  return items.map((item) =>
    item.product.variantId === variantId
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
