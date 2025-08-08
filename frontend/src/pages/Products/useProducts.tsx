import { useEffect } from "react";
import { useProductContext } from "../../context/ProductsProvider";

export const useProducts = () => {
  const {
    finalProducts,
    openProductForm,
    viewProduct,
    deleteModal,
    search,
    price,
    sortOrder,
    setSortOrder,
    setPrice,
    setSearch,
    setDeleteModal,
    fetchProducts,
    setOpenProductForm,
  } = useProductContext();

  useEffect(() => {
    fetchProducts({
      search,
      minPrice: price[0],
      maxPrice: price[1],
      sortOrder,
    });
  }, [search, price, sortOrder]);

  return {
    finalProducts,
    openProductForm,
    viewProduct,
    search,
    price,
    deleteModal,
    sortOrder,
    setSortOrder,
    setPrice,
    setSearch,
    setOpenProductForm,
    setDeleteModal,
  };
};
