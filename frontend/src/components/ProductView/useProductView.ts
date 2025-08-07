import { useEffect, useRef } from "react";
import { useProductContext } from "../../context/ProductsProvider";

export const useProductView = () => {
  const { viewProduct, setViewProduct } = useProductContext();
  const ref = useRef<HTMLDivElement>(null);
  const productViewClose = () => setViewProduct(null);

  //Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        productViewClose();
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productViewClose]);

  return { viewProduct, ref };
};
