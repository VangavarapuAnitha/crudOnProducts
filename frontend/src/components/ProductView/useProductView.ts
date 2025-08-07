import { useProductContext } from "../../context/ProductsProvider";

export const useProductView = () => {
  const { viewProduct, setViewProduct } = useProductContext();

  return { viewProduct, setViewProduct };
};
