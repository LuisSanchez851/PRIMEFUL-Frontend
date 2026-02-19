// src/components/layout/Footer.tsx
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-xl">
                PF
              </div>
              <span className="font-bold text-xl">PRIMEFUEL</span>
            </div>
            <p className="text-gray-400 text-sm">
              Tu tienda de confianza para suplementos deportivos de alta calidad.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4">Comprar</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/catalog?category=proteina" className="hover:text-white transition-colors">
                  Proteínas
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=creatina" className="hover:text-white transition-colors">
                  Creatinas
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=pre-entreno" className="hover:text-white transition-colors">
                  Pre-Entrenos
                </Link>
              </li>
              <li>
                <Link to="/catalog?featured=true" className="hover:text-white transition-colors">
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Envíos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 PRIMEFUEL. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
