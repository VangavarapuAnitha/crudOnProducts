import { useProductContext } from "../../context/ProductsProvider";

export const useSideMenu = () => {
  const { price, sortOrder, setSortOrder, setPrice } = useProductContext();

  return {
    price,
    sortOrder,
    setSortOrder,
    setPrice,
  };
};
