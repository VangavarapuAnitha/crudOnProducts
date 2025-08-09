import { useProductContext } from "../../context/ProductsProvider";

export const useProductsHeader = () => {
  const { search, setSearch, setOpenProductForm } = useProductContext();

  return {
    search,
    setSearch,
    setOpenProductForm,
  };
};
