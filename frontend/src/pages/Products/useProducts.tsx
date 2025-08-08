import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductsProvider";

export const useProducts = () => {
  const {
    finalProducts,
    openProductForm,
    viewProduct,
    deleteModal,
    setDeleteModal,
    fetchProducts,
    setOpenProductForm,
  } = useProductContext();
  const [search, setSearch] = useState<string>("");
  const [price, setPrice] = useState<[number, number]>([500, 50000]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

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
