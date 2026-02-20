//src/components/ProductCard.tsx
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartContext } from "../../context/CartContext";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartContext();

  const finalPrice =
    product.discount_percentage > 0
      ? product.min_price -
      (product.min_price * product.discount_percentage) / 100
      : product.min_price;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    await addToCart(
      {
        id: product.id,
        name: product.name,
        price: finalPrice,
        image: product.main_image,
        brand: product.brand_name,
      },
      1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-500 transition-all hover:shadow-xl"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.main_image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.is_bestseller && (
              <span className="bg-black text-white text-xs px-3 py-1 rounded-full font-medium">
                Más vendido
              </span>
            )}

            {product.discount_percentage > 0 && (
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                -{product.discount_percentage}%
              </span>
            )}
          </div>

          {product.objective && (
            <div className="absolute top-3 right-3">
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium capitalize">
                {product.objective}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-xs text-gray-500 uppercase font-medium mb-1">
            {product.brand_name}
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>

          {product.level && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-500">Nivel:</span>
              <span className="text-xs font-medium text-gray-700 capitalize">
                {product.level}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              {product.discount_percentage > 0 && (
                <span className="text-sm text-gray-400 line-through block">
                  ${Number(product.min_price).toLocaleString()}
                </span>
              )}

              <span className="text-2xl font-bold text-black">
                ${Number(finalPrice).toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-orange-500/30"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
