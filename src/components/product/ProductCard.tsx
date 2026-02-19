import type { Product } from "../../types/product";
import { useCart } from "../../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addProduct, loading } = useCart();

  const handleAddToCart = async () => {
    await addProduct(product, 1);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-3"
      />

      <h3 className="text-lg font-semibold">{product.name}</h3>

      <p className="text-gray-600 mb-2">
        ${product.price.toFixed(2)}
      </p>

      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50 transition"
      >
        {loading ? "Agregando..." : "Agregar al carrito"}
      </button>
    </div>
  );
};
