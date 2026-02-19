import { Outlet } from "react-router-dom";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";

export const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Contenido dinámico */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
