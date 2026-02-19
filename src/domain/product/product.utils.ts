// src/domain/product/product.utils.ts
import type { Product } from "../../types/product";

/**
 * Filtra productos por categoría
 */
export function filterProductsByCategory(
  products: Product[],
  category: Product["category"]
): Product[] {
  return products.filter((product) => product.category === category);
}

/**
 * Obtiene productos destacados
 */
export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter((product) => product.featured);
}

/**
 * Obtiene productos en stock
 */
export function getAvailableProducts(products: Product[]): Product[] {
  return products.filter((product) => product.inStock);
}

/**
 * Ordena productos por precio
 */
export function sortProductsByPrice(
  products: Product[],
  order: "asc" | "desc" = "asc"
): Product[] {
  return [...products].sort((a, b) =>
    order === "asc" ? a.price - b.price : b.price - a.price
  );
}
