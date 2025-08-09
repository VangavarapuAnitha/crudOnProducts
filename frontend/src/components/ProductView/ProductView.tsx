import { IndianRupee } from "lucide-react";
import { useProductView } from "./useProductView";
import { Modal } from "../../shared/components";
import { checkValidImageURL } from "../../shared/utils/checkValidImageURL";

const ProductView = () => {
  const { viewProduct, categoryNames, setViewProduct } = useProductView();

  return (
    <Modal
      onClose={() => setViewProduct(null)}
      classes={{
        modalHeader: "border-none",
      }}
    >
      <div>
        {checkValidImageURL(viewProduct?.imageUrl!) ? (
          <a
            href={viewProduct?.productUrl!}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={viewProduct?.imageUrl}
              alt={viewProduct?.name}
              className=" w-full h-64 sm:h-72 md:h-80 object-contain p-4 cursor-pointer"
            />
          </a>
        ) : (
          <div>{viewProduct?.name}</div>
        )}
        <div className="px-4 pb-4 text-left flex flex-col gap-2">
          <p className="flex items-center text-sm">
            <span className="w-20">Name</span>
            <span>: &nbsp;</span>
            <span className="flex-1">{viewProduct?.name}</span>
          </p>
          <p className="flex items-center text-sm">
            <span className="w-20">Category</span>
            <span>: &nbsp;</span>
            <span className="flex-1">{categoryNames.join(", ")}</span>
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
    </Modal>
  );
};

export default ProductView;
