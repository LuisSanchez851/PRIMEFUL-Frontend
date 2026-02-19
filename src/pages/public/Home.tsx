//src/pages/public/Home.tsx
import { Link } from "react-router-dom";
import { ProductCard } from "../../components/product/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "../../components/layout/Header";


const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?q=80&w=1600",
    title: "Mejora tu rendimiento",
    subtitle: "Sin límites",
  },
  {
    url: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1600",
    title: "Alcanza tus metas",
    subtitle: "Con PrimeFuel",
  },
];

const Home = () => {
  const { products, loading } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);

  if (loading) {
    return <p className="text-center py-20">Cargando productos...</p>;
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  const bestsellers = products
    .filter((p) => p.bestseller)
    .slice(0, 4);

  const featuredProducts = products
    .filter((p) => p.featured)
    .slice(0, 4);

  return (
    <div className="space-y-16">
      {/* HERO SLIDER */}

      
      <section className="relative h-[500px] overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={image.url}
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />

            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {image.title}
                </h1>
                <p className="text-xl mb-6 text-orange-400">
                  {image.subtitle}
                </p>
                <Link
                  to="/catalog"
                  className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Explorar catálogo
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/40 transition"
        >
          <ChevronLeft className="text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/40 transition"
        >
          <ChevronRight className="text-white" />
        </button>
      </section>

      {/* MÁS VENDIDOS */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Más Vendidos</h2>
          <Link
            to="/catalog?bestseller=true"
            className="text-orange-500 hover:text-orange-600"
          >
            Ver todos
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* OFERTAS DESTACADAS */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Ofertas Destacadas</h2>
          <Link
            to="/catalog?featured=true"
            className="text-orange-500 hover:text-orange-600"
          >
            Ver todas
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
