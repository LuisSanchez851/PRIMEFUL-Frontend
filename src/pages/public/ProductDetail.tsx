// src/components/pages/ProductDetail.tsx

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { useProduct } from "../../hooks/useProduct";

export function ProductDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCartContext();

    const { product, loading } = useProduct(slug);

    const [selectedVariant, setSelectedVariant] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (loading) return <div className="p-20">Cargando...</div>;
    if (!product) return <div className="p-20">Producto no encontrado</div>;

    const variant = product.variants[selectedVariant];

    const handleAddToCart = () => {
        addToCart(
            {
                id: product.id,
                variantId: variant.id,
                name: product.name,
                variantName: variant.name,
                price: variant.price,
                image:
                    product.images.find((img) => img.is_main)?.url ??
                    product.images[0]?.url ??
                    "",
                brand: product.brand_name,
            },
            quantity
        );
    };

    return (
        <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* IMAGEN */}
            <div>
                <img
                    src={
                        product.images.find((img) => img.is_main)?.url ??
                        product.images[0]?.url ??
                        ""
                    }
                    className="rounded-2xl w-full object-cover"
                />
            </div>

            {/* INFO */}
            <div>
                <p className="text-gray-500">{product.brand_name}</p>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                {/* Selector de variante */}
                {product.variants.length > 1 && (
                    <div className="mb-6">
                        <p className="font-semibold mb-2">Selecciona presentación:</p>
                        <div className="flex gap-3">
                            {product.variants.map((v, index) => (
                                <button
                                    key={v.id}
                                    onClick={() => setSelectedVariant(index)}
                                    className={`px-4 py-2 rounded-lg border ${index === selectedVariant
                                            ? "border-black"
                                            : "border-gray-300"
                                        }`}
                                >
                                    {v.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Precio */}
                <div className="text-3xl font-bold mb-6">
                    ${variant.price.toLocaleString()}
                </div>

                <p className="text-gray-600 mb-6">{product.description}</p>

                {/* Agregar */}
                <button
                    onClick={handleAddToCart}
                    className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}