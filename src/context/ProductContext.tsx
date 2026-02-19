//src/context/ProductContext.tsx
import { createContext, useContext } from "react";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";

interface ProductContextType {
  products: Product[];
  featured: Product[];
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const { products, featured, loading } = useProducts();

  return (
    <ProductContext.Provider value={{ products, featured, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within ProductProvider");
  }
  return context;
}
