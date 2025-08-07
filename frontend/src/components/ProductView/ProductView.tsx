import { IndianRupee } from "lucide-react";
import { useProductView } from "./useProductView";

const ProductView = () => {
  const { viewProduct, ref } = useProductView();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000aa] z-50 px-4">
      <div
        className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white rounded-lg border shadow-md"
        ref={ref}
      >
        <img
          src={viewProduct?.imageUrl}
          alt={viewProduct?.name}
          className=" w-full h-64 sm:h-72 md:h-80 object-contain p-4"
        />
        <div className="px-4 pb-4 text-left flex flex-col gap-2">
          <p className="flex items-center text-sm">
            <span className="w-20">Name</span>
            <span>: &nbsp;</span>
            <span className="flex-1">{viewProduct?.name}</span>
          </p>
          <p className="flex items-center text-sm">
            <span className="w-20">Category</span>
            <span>: &nbsp;</span>
            <span className="flex-1">{viewProduct?.category}</span>
          </p>
          <p className="flex items-center text-sm">
            <span className="w-20">Price</span>
            <span>:&nbsp;</span>
            <IndianRupee size={14} />
            {viewProduct?.price}
          </p>
          <p className="flex flex-col gap-1">
            <span className="text-sm">Description:</span>
            <span className="text-xs text-gray-600 ">
              {viewProduct?.description}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
