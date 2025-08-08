import axiosInstance from "../../shared/utils/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";
import { useProductContext } from "../../context/ProductsProvider";

export const useDeleteProduct = (id: string, onClose: () => void) => {
  const { fetchProducts } = useProductContext();

  //Delete product
  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/products/${id}`);
      toast.success(res.data.message || "Deleted successfully");
      onClose();
      fetchProducts();
    } catch (error) {
      console.log("Error in deleting product:", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong.Try after sometime!"
        );
      } else {
        toast.error("Something went wrong.Try after sometime!");
      }
    }
  };

  return { handleDelete };
};
