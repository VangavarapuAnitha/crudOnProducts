import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductsProvider";
import type { ProductType } from "../../types/products.types";
export const useProducts = () => {
  const {
    finalProducts,
    fetchedProducts,
    openProductForm,
    viewProduct,
    deleteModal,
    setDeleteModal,
    setFinalProducts,
    setOpenProductForm,
  } = useProductContext();
  const [search, setSearch] = useState<string>("");
  const [price, setPrice] = useState<[number, number]>([500, 50000]);

  useEffect(() => {
    const filterdProducts = fetchedProducts.filter((product: ProductType) => {
      const isProductMatched =
        !search || product.name.toLowerCase().includes(search.toLowerCase());

      const isPriceMatched =
        product.price >= price[0] && product.price <= price[1];

      return isPriceMatched && isProductMatched;
    });
    setFinalProducts(filterdProducts);
  }, [search, price, fetchedProducts]);

  return {
    finalProducts,
    openProductForm,
    viewProduct,
    search,
    price,
    deleteModal,
    setPrice,
    setSearch,
    setOpenProductForm,
    setDeleteModal,
  };
};
