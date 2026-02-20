//src/components/ProductCard.tsx
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "../../types/product";
import type { CartItemProduct } from "../../types/cart";
import { useCart } from "../../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addProduct } = useCart();

  // 🔥 Variante por defecto (primera)
  const defaultVariant = product.variants?.[0];
  if (!defaultVariant) {
    return null; // evita que rompa mientras migras datos
  }

  // 🔥 Precio más bajo (para mostrar "Desde $X" si quieres)
  const lowestPrice = Math.min(
    ...product.variants.map((v) => v.price)
  );

  // 🔥 Descuento basado en la variante por defecto
  const discount =
    defaultVariant.originalPrice &&
    Math.round(
      (1 -
        defaultVariant.price /
        defaultVariant.originalPrice) *
      100
    );

  const handleAddToCart = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    const cartProduct: CartItemProduct = {
      id: product.id,
      variantId: defaultVariant.id,
      name: product.name,
      variantName: defaultVariant.name,
      price: defaultVariant.price,
      image: product.images?.[0],
    };

    addProduct(cartProduct, 1);
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
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
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

        {/* Content */}
        <div className="p-4">
          <div className="text-xs text-gray-500 uppercase font-medium mb-1">
            {product.brand}
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>

          {/* Precio */}
          <div className="flex items-center justify-between">
            <div>
              {defaultVariant.originalPrice && (
                <span className="text-sm text-gray-400 line-through block">
                  ${defaultVariant.originalPrice.toLocaleString()}
                </span>
              )}

              <span className="text-2xl font-bold text-black">
                ${defaultVariant.price.toLocaleString()}
              </span>

              {product.variants.length > 1 && (
                <div className="text-xs text-gray-500">
                  Desde ${lowestPrice.toLocaleString()}
                </div>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={defaultVariant.stock <= 0}
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
