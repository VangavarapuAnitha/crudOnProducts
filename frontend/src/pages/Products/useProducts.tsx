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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    let filteredProducts = fetchedProducts.filter((product: ProductType) => {
      //Search product
      const isProductMatched =
        !search || product.name.toLowerCase().includes(search.toLowerCase());

      //Match price range
      const isPriceMatched =
        product.price >= price[0] && product.price <= price[1];

      return isPriceMatched && isProductMatched;
    });

    //Sort products by price
    if (sortOrder === "asc") {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }
    setFinalProducts(filteredProducts);
  }, [search, price, fetchedProducts, sortOrder]);

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
