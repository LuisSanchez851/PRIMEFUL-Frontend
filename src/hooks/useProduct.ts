// src/hooks/useProduct.ts

import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import type { ProductDetail } from "../types/product-detail";

export function useProduct(slug?: string) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          slug,
          description,
          objective,
          level,
          is_bestseller,
          discount_percentage,
          brands(name),
          products_variants (
            id,
            name,
            price,
            stock
          ),
          product_images (
            id,
            url,
            is_main
          )
        `)
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (!error && data) {
        setProduct({
          id: data.id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          objective: data.objective,
          level: data.level,
          is_bestseller: data.is_bestseller,
          discount_percentage: data.discount_percentage,
          brand_name: data.brands?.[0]?.name ?? "",
          variants: data.products_variants
            .filter((v: any) => v.stock > 0)
            .map((v: any) => ({
              id: v.id,
              name: v.name,
              price: Number(v.price),
              stock: v.stock,
            })),
          images: data.product_images,
        });
      }

      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  return { product, loading };
}