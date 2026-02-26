import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import type { CatalogProduct } from "../types/catalog-product";

export function useProducts() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [featured, setFeatured] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      const { data, error } = await supabase
        .from("catalog_products")
        .select("*")

      if (error) {
        console.error("Supabase error:", error);
        setLoading(false);
        return;
      }

      if (!data) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const mapped: CatalogProduct[] = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        brand_name: p.brand_name,
        main_image: p.main_image ?? "",
        min_price: Number(p.min_price),
        original_price:
          p.discount_percentage > 0
            ? Number(p.min_price)
            : undefined,
        stock: p.total_stock,
        bestseller: p.is_bestseller,
      }));

      setProducts(mapped);
      setFeatured(mapped.filter((p) => p.bestseller));
      setLoading(false);
    }

    loadProducts();
  }, []);

  return { products, featured, loading };
}