//src/types/catalog-product.ts
export interface CatalogProduct {
  id: string;
  name: string;
  brand_name: string;
  main_image: string;
  min_price: number;
  original_price?: number;
  stock?: number;
  bestseller?: boolean;
  featured?: boolean;
}