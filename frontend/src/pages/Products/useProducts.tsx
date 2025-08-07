import { useProductContext } from "../../context/ProductsProvider";
export const useProducts = () => {
  const { finalProducts, openProductForm, viewProduct } = useProductContext();
  return { finalProducts, openProductForm, viewProduct };
};
