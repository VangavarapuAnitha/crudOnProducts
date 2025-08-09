import { useState } from "react";
import { Products } from "./pages/Products";
import ProductProvider from "./context/ProductsProvider";
import { ToastContainer } from "react-toastify";
import { ProductsHeader } from "./components/ProductsHeader";
import { SideMenu } from "./components/SideMenu";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 h-screen overflow-hidden">
      <ProductProvider>
        {/* Header */}
        <ProductsHeader
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => setIsMenuOpen((value) => !value)}
        />

        {/* Main layout*/}
        <div className="flex h-[calc(100vh-64px)]">
          {/* Sidebar: slides in on small screens, fixed/visible on md+ */}
          <aside
            className={
              `bg-white border-r border-gray-200 px-4 pt-4
               fixed top-16 left-0 z-45 w-60 h-[calc(100vh-64px)]
               transform transition-transform duration-300 ease-in-out
               md:static md:translate-x-0` +
              (isMenuOpen ? " translate-x-0" : " -translate-x-full")
            }
          >
            <SideMenu />
          </aside>

          {/* Overlay for small screens when menu open */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-20 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          {/* Main content area (scrollable) */}
          <main className="flex-1 overflow-y-auto pt-4">
            <Products />
          </main>
        </div>
      </ProductProvider>

      <ToastContainer />
    </div>
  );
}

export default App;
