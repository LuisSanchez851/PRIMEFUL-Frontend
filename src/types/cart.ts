// src/types/cart.ts
export interface CartItemProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  brand?: string;
  variantId?: string;
}
export interface CartItem {
  product: CartItemProduct;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
