//src/pages/public/Home.tsx
import { Link } from "react-router-dom";
import { ProductCard } from "../../components/product/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { Truck, Shield, Award } from "lucide-react";


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

      <section className="relative h-[600px] bg-black overflow-hidden">
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

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-2xl text-left text-white">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    {image.title}
                    <br />
                    <span className="text-orange-500">{image.subtitle}</span>
                  </h1>

                  <p className="text-lg md:text-xl text-gray-300 mb-8">
                    Suplementos deportivos de alta calidad para llevar tu entrenamiento al siguiente nivel
                  </p>

                  <Link
                    to="/catalog"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-bold transition shadow-2xl shadow-orange-500/30"
                  >
                    Comprar ahora
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}


        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 w-2"
                }`}
            />
          ))}
        </div>
      </section>

      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                <Truck className="w-8 h-8 text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Envío Gratis</h3>
                <p className="text-gray-600 text-sm">
                  En compras superiores a $100.000
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Pago Seguro</h3>
                <p className="text-gray-600 text-sm">
                  Tus datos están protegidos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Calidad Garantizada</h3>
                <p className="text-gray-600 text-sm">
                  Productos originales certificados
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Categorías Principales
            </h2>
            <p className="text-gray-600 text-lg">
              Encuentra el suplemento perfecto para tus objetivos
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Proteínas", "Creatinas", "Pre-Entrenos", "Aminoácidos", "Quemadores"].map(
              (category) => (
                <Link
                  key={category}
                  to="/catalog"
                  className="bg-gradient-to-br from-gray-50 to-gray-100 hover:from-orange-50 hover:to-orange-100 rounded-2xl p-6 text-center transition border border-gray-200 hover:border-orange-300 hover:shadow-lg"
                >
                  <h3 className="font-bold text-lg hover:text-orange-500 transition">
                    {category}
                  </h3>
                </Link>
              )
            )}
          </div>
        </div>
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

      <section className="py-16 bg-gradient-to-br from-orange-500 to-red-600">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            ¿Listo para transformar tu entrenamiento?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de atletas que confían en FitStore
          </p>

          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition"
          >
            Explorar catálogo
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
