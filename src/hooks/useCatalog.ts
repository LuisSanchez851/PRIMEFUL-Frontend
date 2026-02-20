//src/hooks/useCatalog.ts
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useSearchParams } from "react-router-dom";

export function useCatalog() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category");
  const objective = searchParams.get("objective");
  const level = searchParams.get("level");
  const featured = searchParams.get("featured");
  const bestseller = searchParams.get("bestseller");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let query = supabase
        .from("catalog_products")
        .select("*");

      if (category) query = query.eq("category_slug", category);
      if (objective) query = query.eq("objective", objective);
      if (level) query = query.eq("level", level);
      if (featured) query = query.eq("is_featured", true);
      if (bestseller) query = query.eq("is_bestseller", true);

      if (search) {
        query = query.ilike("name", `%${search}%`);
      }

      if (sort === "price_asc")
        query = query.order("min_price", { ascending: true });

      if (sort === "price_desc")
        query = query.order("min_price", { ascending: false });

      const { data, error } = await query;

      if (!error && data) setProducts(data);

      setLoading(false);
    };

    fetchProducts();
  }, [category, objective, level, featured, bestseller, search, sort]);

  return { products, loading };
}
