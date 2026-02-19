// src/hooks/useProducts.ts
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import {
  getAllProducts,
  getFeatured,
} from "../services/product.service";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const [all, featuredProducts] = await Promise.all([
        getAllProducts(),
        getFeatured(),
      ]);

      setProducts(all);
      setFeatured(featuredProducts);
      setLoading(false);
    }

    loadProducts();
  }, []);

  return {
    products,
    featured,
    loading,
  };
}
