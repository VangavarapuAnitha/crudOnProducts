import { useState } from "react";
import { useProductContext } from "../../context/ProductsProvider";

export const useSelectCategories = () => {
  const { categoryList, selectedCategories, setSelectedCategories } =
    useProductContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const options = categoryList.map((category) => ({
    key: category._id,
    label: category.name,
  }));

  return {
    options,
    selectedCategories,
    isOpen,
    setIsOpen,
    setSelectedCategories,
  };
};
