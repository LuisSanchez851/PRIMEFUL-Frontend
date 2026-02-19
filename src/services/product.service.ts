// src/services/product.service.ts
import { products } from "../data/products";
import type { Product } from "../types/product";
import {
  getAvailableProducts,
  getFeaturedProducts,
} from "../domain/product/product.utils";

export async function getAllProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export async function getFeatured(): Promise<Product[]> {
  return Promise.resolve(getFeaturedProducts(products));
}

export async function getAvailable(): Promise<Product[]> {
  return Promise.resolve(getAvailableProducts(products));
}

export async function getProductById(
  id: string
): Promise<Product | undefined> {
  return Promise.resolve(products.find((p) => p.id === id));
}
