import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ProductType } from "../types/products.types";
// import axios from "../shared/utils/axiosInstance";

interface OpenProductFormProps {
  show: boolean;
  initialData: ProductType | null;
}

export interface ProductsProviderProp {
  children: ReactNode;
}

export interface ProductsContextProps {
  fetchedProducts: ProductType[];
  finalProducts: ProductType[];
  openProductForm: OpenProductFormProps;
  viewProduct: ProductType | null;
  loading: boolean;
  loadingError: string | null;
  setViewProduct: (val: ProductType | null) => void;
  setOpenProductForm: (val: OpenProductFormProps) => void;
}

export const ProductContext = createContext<ProductsContextProps | null>(null);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

const ProductProvider: React.FC<ProductsProviderProp> = ({ children }) => {
  const [fetchedProducts, setFetchedProducts] = useState<ProductType[]>([]);
  const [finalProducts, setFinalProducts] = useState<ProductType[]>([]);
  const [viewProduct, setViewProduct] = useState<ProductType | null>(null);
  const [openProductForm, setOpenProductForm] = useState<OpenProductFormProps>({
    show: false,
    initialData: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  //Fetch all products data
  // const fetchProducts = async () => {
  //   setLoading(true);
  //   setLoadingError(null);
  //   try {
  //     const res = await axios.get("/");
  //     const data: ProductType[] = res.data;
  //     setFetchedProducts(data);
  //     setFinalProducts(data);
  //   } catch (error) {
  //     console.log("Failed to fetch products:", error);
  //     setLoadingError("Failed to load products");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchProducts = async () => {
    setLoading(true);
    setLoadingError(null);
    try {
      const res = await import("../data/products.json");
      const data: ProductType[] = res.products;
      setFetchedProducts(data);
      setFinalProducts(data);
    } catch (error) {
      console.log("Failed to fetch products:", error);
      setLoadingError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  //Fetch all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  //Context values
  const contextValue: ProductsContextProps = {
    fetchedProducts,
    finalProducts,
    openProductForm,
    viewProduct,
    loading,
    loadingError,
    setViewProduct,
    setOpenProductForm,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
