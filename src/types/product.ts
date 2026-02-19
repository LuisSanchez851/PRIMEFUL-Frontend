//src/types/product.ts
export type ProductCategory =
  | 'proteina'
  | 'creatina'
  | 'pre-entreno'
  | 'aminoacidos'
  | 'quemadores';

export type ProductObjective =
  | 'fuerza'
  | 'masa'
  | 'recuperacion'
  | 'energia'
  | 'definicion';

export type ProductLevel =
  | 'principiante'
  | 'intermedio'
  | 'avanzado';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  benefits: string[];
  usage: string;
  objective: ProductObjective;
  level: ProductLevel;
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
}
