// src/components/product/CatalogProductCard.tsx
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../hooks/useCart";

interface CatalogProduct {
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

interface Props {
  product: CatalogProduct;
}

export function CatalogProductCard({ product }: Props) {
  const { addProduct } = useCart();

  const discount =
    product.original_price &&
    Math.round(
      (1 - product.min_price / product.original_price) * 100
    );

  const handleAddToCart = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    addProduct(
      {
        id: product.id,
        variantId: product.id, // temporal
        name: product.name,
        variantName: "Default",
        price: product.min_price,
        image: product.main_image,
      },
      1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-500 transition-all hover:shadow-xl"
      >
        {/* IMAGE */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.main_image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* BADGES */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.bestseller && (
              <span className="bg-black text-white text-xs px-3 py-1 rounded-full font-medium">
                Más vendido
              </span>
            )}

            {discount && (
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <div className="text-xs text-gray-500 uppercase font-medium mb-1">
            {product.brand_name}
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div>
              {product.original_price && (
                <span className="text-sm text-gray-400 line-through block">
                  ${product.original_price.toLocaleString()}
                </span>
              )}

              <span className="text-2xl font-bold text-black">
                ${product.min_price.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-orange-500/30"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}