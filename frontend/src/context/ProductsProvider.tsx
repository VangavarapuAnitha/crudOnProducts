import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ProductType, CategoryType } from "../types/products.types";
import axiosInstance from "../shared/utils/axiosInstance";

interface FetchProductsProps {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortOrder?: "asc" | "desc" | null;
}

interface DeleteModalProps {
  id: string | null;
  name: string | null;
}

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
  deleteModal: DeleteModalProps;
  categoryList: CategoryType[];
  setDeleteModal: (val: DeleteModalProps) => void;
  fetchProducts: (val: FetchProductsProps) => void;
  setFinalProducts: (val: ProductType[]) => void;
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
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<DeleteModalProps>({
    id: null,
    name: null,
  });

  //Fetch all products data
  const fetchProducts = async ({
    search,
    minPrice,
    maxPrice,
    sortOrder,
  }: FetchProductsProps) => {
    console.log("calling api");
    console.log(search, minPrice, maxPrice, sortOrder);
    setLoading(true);
    setLoadingError(null);
    try {
      let params: Record<string, any> = {};

      if (search) params.search = search;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (sortOrder) params.sortOrder = sortOrder;

      console.log(params);

      const res = await axiosInstance.get("/products", { params });
      console.log(res);
      const data: ProductType[] = res.data.products;
      setFetchedProducts(data);
      setFinalProducts(data);
    } catch (error) {
      console.log("Failed to fetch products:", error);
      setLoadingError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await axiosInstance.get("/categories");
      const data: CategoryType[] = result.data.categories;
      setCategoryList(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategoryList([]);
    }
  };

  //Fetch all products on mount
  useEffect(() => {
    fetchProducts({});
    fetchCategories();
  }, []);

  //Context values
  const contextValue: ProductsContextProps = {
    fetchedProducts,
    finalProducts,
    openProductForm,
    viewProduct,
    loading,
    loadingError,
    deleteModal,
    categoryList,
    setDeleteModal,
    fetchProducts,
    setFinalProducts,
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
