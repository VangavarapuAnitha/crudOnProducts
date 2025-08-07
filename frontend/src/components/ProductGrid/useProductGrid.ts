import { useProductContext } from "../../context/ProductsProvider";

export const useProductGrid = () => {
  const { setViewProduct, setOpenProductForm } = useProductContext();
  return { setViewProduct, setOpenProductForm };
};
