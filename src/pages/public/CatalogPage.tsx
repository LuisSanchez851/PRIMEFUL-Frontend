//src/pages/public/CatalogPage.tsx
import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useCatalog } from "../../hooks/useCatalog";
import { ProductCard } from "../../components/product/ProductCard";


export function CatalogPage() {
  const { products, loading } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) newParams.set(key, value);
    else newParams.delete(key);

    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchInput("");
  };

  const activeFiltersCount = Array.from(searchParams.keys()).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Catálogo de Productos
          </h1>
          <p className="text-gray-600 text-lg">
            Descubre nuestra selección completa de suplementos deportivos
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-4 mb-8 border shadow-sm">

          <div className="flex flex-col md:flex-row gap-4">

            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateParam("search", searchInput);
                  }
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Filters button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t grid md:grid-cols-3 gap-4">

              <select
                onChange={(e) => updateParam("category", e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="">Todas las categorías</option>
                <option value="proteinas">Proteínas</option>
                <option value="creatina">Creatina</option>
              </select>

              <select
                onChange={(e) => updateParam("objective", e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="">Todos los objetivos</option>
                <option value="masa">Masa Muscular</option>
                <option value="energia">Energía</option>
              </select>

              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 px-4 py-2 text-orange-500 hover:bg-orange-50 rounded-lg"
              >
                <X className="w-5 h-5" />
                Limpiar
              </button>

            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando{" "}
            <span className="font-bold text-black">
              {loading ? "..." : products.length}
            </span>{" "}
            productos
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <p>Cargando productos...</p>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-bold mb-2">
              No se encontraron productos
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
                <img
                  src={product.main_image}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-500">
                    {product.brand_name}
                  </p>
                  <h3 className="font-bold text-lg mb-2">
                    {product.name}
                  </h3>
                  <p className="text-orange-500 font-bold text-xl">
                    ${Number(product.min_price).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
