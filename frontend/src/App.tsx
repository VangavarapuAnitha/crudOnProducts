import { Products } from "./pages/Products";
import ProductProvider from "./context/ProductsProvider";

function App() {
  return (
    <div>
      <ProductProvider>
        <Products />
      </ProductProvider>
    </div>
  );
}

export default App;
