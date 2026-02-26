// src/types/product-detail.ts

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface ProductImage {
  id: string;
  url: string;
  is_main: boolean;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  objective: string;
  level: string;
  is_bestseller: boolean;
  discount_percentage: number;
  brand_name: string;
  variants: ProductVariant[];
  images: ProductImage[];
}