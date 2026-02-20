// src/data/products.ts
import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "p1",
    name: "Whey Protein Gold",
    brand: "Optimum Nutrition",
    category: "proteina",
    images: ["/images/products/whey-gold.png"],
    description:
      "Proteína de suero de alta calidad para ganancia muscular.",
    benefits: [
      "Aumenta masa muscular",
      "Mejora recuperación",
      "Alta biodisponibilidad",
    ],
    usage: "Consumir 1 scoop después del entrenamiento.",
    objective: "masa",
    level: "principiante",
    featured: true,
    bestseller: true,
    variants: [
      {
        id: "p1-1kg-chocolate",
        name: "1kg Chocolate",
        price: 120000,
        originalPrice: 150000,
        stock: 15,
        attributes: {
          flavor: "Chocolate",
          size: "1kg",
        },
      },
    ],
  },
];
