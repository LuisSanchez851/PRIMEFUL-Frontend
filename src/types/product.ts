// src/types/product.ts

export type ProductCategory =
  | "proteina"
  | "creatina"
  | "pre-entreno"
  | "aminoacidos"
  | "quemadores";

export type ProductObjective =
  | "fuerza"
  | "masa"
  | "recuperacion"
  | "energia"
  | "definicion";

export type ProductLevel =
  | "principiante"
  | "intermedio"
  | "avanzado";

export interface ProductVariant {
  id: string;
  name: string; // Ej: "1kg Chocolate"
  price: number;
  originalPrice?: number;
  stock: number;
  attributes?: {
    flavor?: string;
    size?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  images: string[];
  description: string;
  benefits: string[];
  usage: string;
  objective: ProductObjective;
  level: ProductLevel;
  variants: ProductVariant[];
  featured?: boolean;
  bestseller?: boolean;
}
