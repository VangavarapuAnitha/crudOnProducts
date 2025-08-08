import { useProductContext } from "../../context/ProductsProvider";

export const useProductGrid = () => {
  const { setViewProduct, setOpenProductForm, setDeleteModal, deleteModal } =
    useProductContext();

  return {
    setViewProduct,
    setOpenProductForm,
    setDeleteModal,
    deleteModal,
  };
};
