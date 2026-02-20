// src/services/cart.service.ts
import type { Cart, CartItem, CartItemProduct } from "../types/cart";
import {
  addToCart,
  removeFromCart,
  updateItemQuantity,
  recalculateCart,
} from "../domain/cart/cart.utils";

// Estado del carrito en memoria
let cartItems: CartItem[] = [];

/**
 * Obtiene el carrito actual
 */
export async function getCart(): Promise<Cart> {
  return Promise.resolve(recalculateCart(cartItems));
}

/**
 * Agrega un producto al carrito
 */
export async function addProductToCart(
  product: CartItemProduct,
  quantity: number
): Promise<Cart> {
  cartItems = addToCart(cartItems, product, quantity);
  return Promise.resolve(recalculateCart(cartItems));
}

/**
 * Elimina un producto del carrito
 */
export async function removeProductFromCart(
  variantId: string
): Promise<Cart> {
  cartItems = removeFromCart(cartItems, variantId);
  return Promise.resolve(recalculateCart(cartItems));
}

/**
 * Actualiza la cantidad de un producto
 */
export async function updateProductQuantity(
  productId: string,
  quantity: number
): Promise<Cart> {
  cartItems = updateItemQuantity(cartItems, productId, quantity);
  return Promise.resolve(recalculateCart(cartItems));
}

/**
 * Limpia el carrito
 */
export async function clearCart(): Promise<Cart> {
  cartItems = [];
  return Promise.resolve(recalculateCart(cartItems));
}
