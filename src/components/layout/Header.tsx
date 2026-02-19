//src/components/layout/Header.tsx
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useCart} from "../../hooks/useCart";


export function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-xl">
              PF
            </div>
            <span className="font-bold text-xl hidden sm:block">PrimeFuel</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/catalog"
              className={`transition-colors hover:text-orange-500 ${isActive('/catalog') ? 'text-orange-500' : ''}`}
            >
              Catálogo
            </Link>
            <Link
              to="/catalog?featured=true"
              className="transition-colors hover:text-orange-500"
            >
              Ofertas
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={`transition-colors hover:text-orange-500 ${isActive('/admin') ? 'text-orange-500' : ''}`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/catalog"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>

            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-gray-400">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-orange-500 hover:text-orange-400"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col gap-4">
              <Link
                to="/catalog"
                className="py-2 hover:text-orange-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Catálogo
              </Link>
              <Link
                to="/catalog?featured=true"
                className="py-2 hover:text-orange-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ofertas
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="py-2 hover:text-orange-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {user ? (
                <div className="py-2 flex items-center justify-between">
                  <span className="text-gray-400">{user.name}</span>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-orange-500 hover:text-orange-400"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="py-2 hover:text-orange-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
