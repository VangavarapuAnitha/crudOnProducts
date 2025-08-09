import { ProductForm } from "../../components/ProductForm";
import { ProductGrid } from "../../components/ProductGrid";
import { ProductView } from "../../components/ProductView";
import type { ProductType } from "../../types/products.types";
import { useProducts } from "./useProducts";
import { DeleteProduct } from "../../components/DeleteProduct";

const Products = () => {
  const {
    finalProducts,
    openProductForm,
    viewProduct,
    deleteModal,
    setDeleteModal,
  } = useProducts();

  return (
    <div>
      {/*No products */}
      {finalProducts.length === 0 && (
        <p className="text-center mt-4 text-red-500">No products found</p>
      )}
      {/*Render product grids*/}
      <div className="flex flex-wrap justify-center gap-6">
        {finalProducts.map((product: ProductType, index: number) => (
          <ProductGrid key={index} product={product} />
        ))}
      </div>

      {/*Show particular product details*/}
      {viewProduct && <ProductView />}

      {/*Open product form for edit and add product*/}
      {openProductForm.show && <ProductForm />}

      {/*Delete Product*/}
      {deleteModal.id && (
        <DeleteProduct
          onClose={() =>
            setDeleteModal({
              id: null,
              name: null,
            })
          }
          id={deleteModal.id}
          name={deleteModal.name!}
        />
      )}
    </div>
  );
};

export default Products;
