// src/types/cart.ts
export interface CartItemProduct {
  id: string;
  variantId?: string;
  name: string;
  variantName: string;
  price: number;
  image: string;
  brand?: string;
  
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
