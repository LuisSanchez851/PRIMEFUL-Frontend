import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import { PublicLayout } from "../components/layout/PublicLayout";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { CatalogPage } from "../pages/public/CatalogPage";

function AppRouter() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<CatalogPage />} />

            </Route>

            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default AppRouter;
