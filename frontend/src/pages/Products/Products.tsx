import { ProductForm } from "../../components/ProductForm";
import { ProductGrid } from "../../components/ProductGrid";
import { ProductView } from "../../components/ProductView";
import type { ProductType } from "../../types/products.types";
import { useProducts } from "./useProducts";
import { Button, RCSlider, TextInput } from "../../shared/components";
import { IndianRupee, Search } from "lucide-react";
import { DeleteProduct } from "../../components/DeleteProduct";
const Products = () => {
  const {
    finalProducts,
    openProductForm,
    viewProduct,
    search,
    price,
    deleteModal,
    setDeleteModal,
    setPrice,
    setSearch,
    setOpenProductForm,
  } = useProducts();

  return (
    <div className="px-4">
      <div className="flex w-full items-center py-1 gap-2 justify-self-center lg:max-w-xl">
        <div className="flex-1">
          <div className="flex items-center border rounded-lg p-2 justify-between border-gray-200 bg-white">
            <TextInput
              name="search"
              value={search}
              onChange={(val: string) => setSearch(val)}
              placeholder="Search by product name"
              classes={{
                input: "border-none p-0",
              }}
            />
            <Search color="gray" />
          </div>
        </div>
        <Button
          label="Add"
          onClick={() =>
            setOpenProductForm({
              show: true,
              initialData: null,
            })
          }
          className="w-30 h-10 rounded-[7px]"
        />
      </div>
      <div className="flex items-center sm:flex-row border justify-self-center max-w-xl w-full gap-4 px-4 py-1 rounded-lg border-gray-200 bg-white mt-4">
        <div className="flex flex-col items-center text-sm text-blue-950">
          <div> Price Range</div>
          <div className="flex items-center font-medium">
            <IndianRupee size={14} />
            {price[0]}
            -<IndianRupee size={14} />
            {price[1]}
          </div>
        </div>

        <RCSlider
          min={500}
          max={50000}
          onAfterChange={(values) => setPrice([values[0], values[1]])}
        />
      </div>
      {finalProducts.length === 0 && (
        <p className="text-center mt-4 text-red-500">No products found</p>
      )}
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {finalProducts.map((product: ProductType, index: number) => (
          <ProductGrid key={index} product={product} />
        ))}
      </div>
      {viewProduct && <ProductView />}
      {openProductForm.show && <ProductForm />}
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
