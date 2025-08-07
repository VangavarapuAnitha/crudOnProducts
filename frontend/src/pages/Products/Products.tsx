import { ProductForm } from "../../components/ProductForm";
import { ProductGrid } from "../../components/ProductGrid";
import { ProductView } from "../../components/ProductView";
import type { ProductType } from "../../types/products.types";
import { useProducts } from "./useProducts";

const Products = () => {
  const { finalProducts, openProductForm, viewProduct } = useProducts();

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {finalProducts.map((product: ProductType) => (
          <ProductGrid key={product.id} product={product} />
        ))}
      </div>
      {viewProduct && <ProductView />}
      {openProductForm.show && <ProductForm />}
    </div>
  );
};

export default Products;
