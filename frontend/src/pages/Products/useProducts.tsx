import { useState } from "react";
import { useProductContext } from "../../context/ProductsProvider";
export const useProducts = () => {
  const { finalProducts, openProductForm, viewProduct, setOpenProductForm } =
    useProductContext();
  const [search, setSearch] = useState<string>("");
  const [price, setPrice] = useState<[number, number]>([500, 50000]);
  return {
    finalProducts,
    openProductForm,
    viewProduct,
    search,
    price,
    setPrice,
    setSearch,
    setOpenProductForm,
  };
};
