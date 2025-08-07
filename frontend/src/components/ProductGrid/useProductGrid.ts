import { useProductContext } from "../../context/ProductsProvider";

export const useProductGrid = () => {
  const { setViewProduct, setOpernProductForm } = useProductContext();
  return { setViewProduct, setOpernProductForm };
};
