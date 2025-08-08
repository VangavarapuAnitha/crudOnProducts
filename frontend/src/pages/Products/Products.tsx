import { ProductForm } from "../../components/ProductForm";
import { ProductGrid } from "../../components/ProductGrid";
import { ProductView } from "../../components/ProductView";
import type { ProductType } from "../../types/products.types";
import { useProducts } from "./useProducts";
import { Button, DropDown, RCSlider, TextInput } from "../../shared/components";
import { IndianRupee, Search } from "lucide-react";
import { DeleteProduct } from "../../components/DeleteProduct";

const sortOptions = [
  { label: "None", value: "" },
  { label: "Low to High", value: "asc" },
  { label: "High to Low", value: "desc" },
];

const Products = () => {
  const {
    finalProducts,
    openProductForm,
    viewProduct,
    search,
    price,
    deleteModal,
    sortOrder,
    setSortOrder,
    setDeleteModal,
    setPrice,
    setSearch,
    setOpenProductForm,
  } = useProducts();

  return (
    <div className="px-4">
      {/*Search box and Add button */}
      <div className="flex w-full items-center py-1 gap-2 justify-self-center lg:max-w-xl">
        {/*Search box */}
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
        {/* Add Button*/}
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
      {/*Price Range and Sort by price*/}
      <div className="flex flex-col sm:flex-row w-full gap-4 items-center justify-self-center lg:max-w-xl">
        {/*Price Range*/}
        <div className="flex-1 w-full">
          <label>Price Range</label>
          <div className="flex items-center sm:flex-row border w-full gap-4 px-4 py-1 rounded-lg border-gray-200 bg-white">
            <RCSlider
              min={500}
              max={50000}
              onAfterChange={(values) => setPrice([values[0], values[1]])}
            />
            <div className="flex items-center font-medium">
              <IndianRupee size={14} />
              {price[0]}
              -<IndianRupee size={14} />
              {price[1]}
            </div>
          </div>
        </div>
        {/*Sory by price*/}
        <div className="flex-1 w-full">
          <DropDown
            options={sortOptions}
            label="Sort by price"
            onChange={(val) =>
              setSortOrder(val === "" ? null : (val as "asc" | "desc"))
            }
            value={sortOrder ?? ""}
          />
        </div>
      </div>
      {/*No products */}
      {finalProducts.length === 0 && (
        <p className="text-center mt-4 text-red-500">No products found</p>
      )}
      {/*Render product grids*/}
      <div className="flex flex-wrap justify-center gap-6 p-4">
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
