import { Edit, IndianRupee, Trash } from "lucide-react";
import type { ProductType } from "../../types/products.types";
import { useProductGrid } from "./useProductGrid";

interface ProductGridProps {
  product: ProductType;
}

const ProductGrid: React.FC<ProductGridProps> = ({ product }) => {
  const { setViewProduct, setOpenProductForm } = useProductGrid();

  return (
    <div
      className="bg-white rounded-lg shadow-md  border w-60 h-70 flex flex-col  px-4 pt-5 pb-3.5 border-gray-200  cursor-pointer gap-3  transition-transform duration-300 ease-in-out 
             hover:scale-105 "
      onClick={() => setViewProduct(product)}
    >
      {/*Image box */}
      <div className="w-50 h-50  p-4 rounded-lg overflow-hidden flex justify-center items-center mt-1">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>
      {/*Product content */}
      <div className="flex flex-col gap-2">
        {/* Product name max 1 lines */}
        <p className="text-sm leading-snug line-clamp-1">{product.name}</p>
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-1 ">
            <IndianRupee size={18} />
            <span className="text-lg">{product.price}</span>
          </p>
          <div className="flex gap-2 items-center">
            <Edit
              size={18}
              className="cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                setOpenProductForm({
                  show: true,
                  initialData: product,
                });
              }}
            />
            <Trash size={18} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
