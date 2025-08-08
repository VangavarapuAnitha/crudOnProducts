import { useProductContext } from "../../context/ProductsProvider";
import type { CategoryType } from "../../types/products.types";

export const useProductView = () => {
  const { viewProduct, categoryList, setViewProduct } = useProductContext();

  const categoryNames: string[] = viewProduct!.category
    .map((catId) => {
      const found = categoryList.find((c: CategoryType) => c._id === catId);
      return found ? found.name : null;
    })
    .filter((name): name is string => name !== null);

  return { viewProduct, categoryNames, setViewProduct };
};
