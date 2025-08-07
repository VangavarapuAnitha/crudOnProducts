import { Products } from "./pages/Products";
import ProductProvider from "./context/ProductsProvider";
import { User } from "lucide-react";

function App() {
  return (
    <div className="bg-gray-50 ">
      <div className="flex justify-between items-center border-b border-gray-200 bg-white p-4 mb-4">
        <div className="text-xl font-semibold text-blue-950">Welcome</div>
        <User color="gray" />
      </div>
      <ProductProvider>
        <Products />
      </ProductProvider>
    </div>
  );
}

export default App;
