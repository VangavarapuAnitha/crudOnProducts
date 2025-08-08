import { useForm } from "react-hook-form";
import { useProductContext } from "../../context/ProductsProvider";
import { useCallback, useEffect } from "react";
import axiosInstance from "../../shared/utils/axiosInstance";
import { isEqual } from "lodash";
import { toast } from "react-toastify";
import axios from "axios";

export interface FormProps {
  name: string;
  price: number;
  category: string[];
  description: string;
  imageUrl: string;
}

export const useProductForm = () => {
  const { setOpenProductForm, fetchProducts, openProductForm, categoryList } =
    useProductContext();

  const initialData = openProductForm.initialData;
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    defaultValues: {
      name: "",
      category: [],
      price: 0,
      description: "",
      imageUrl: "",
    },
  });

  //Reset form
  const handleReset = useCallback(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        category: initialData.category,
        price: initialData.price,
        description: initialData.description,
        imageUrl: initialData.imageUrl,
      });
    } else {
      reset({
        name: "",
        category: [],
        price: 0,
        description: "",
        imageUrl: "",
      });
    }
  }, [initialData, reset]);

  //Set default form values
  useEffect(() => {
    handleReset();
  }, [initialData, reset]);

  //Submit data
  const onSubmit = async (data: FormProps) => {
    try {
      if (initialData) {
        const oldData = Object.fromEntries(
          Object.entries(initialData).filter(([key]) => key !== "_id")
        );
        console.log("oldData", oldData);
        console.log("newData", data);
        //Check if there is no changes
        if (isEqual(oldData, data)) {
          toast.warning("There is no changes to update");
          return;
        } else {
          //Get modified fields
          const modifiedFields = Object.fromEntries(
            Object.entries(data).filter(
              ([key, value]) => !isEqual(value, oldData[key])
            )
          );
          const payload = {
            id: initialData._id,
            ...modifiedFields,
          };
          console.log(payload);
          //Submit updated data
          const res = await axiosInstance.put("/products", payload);
          toast.success(res.data.message || "Updated succefully!");
        }
      } else {
        //Submit new product
        await axiosInstance.post("/products", data);
        toast.success("New product added!");
      }
      setOpenProductForm({
        show: false,
        initialData: null,
      });
      await fetchProducts();
    } catch (error: any) {
      console.log("Error in update/submit data:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong.Try after some time!";
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong.Try after some time!");
      }
    }
  };

  const handleSelect = useCallback((selectedValues: string[], id: string) => {
    if (selectedValues.includes(id)) {
      return selectedValues.filter((selectedId) => id !== selectedId);
    } else {
      return [...selectedValues, id];
    }
  }, []);

  return {
    setOpenProductForm,
    handleSubmit,
    onSubmit,
    handleSelect,
    handleReset,
    isSubmitting,
    categoryList,
    control,
    initialData,
    errors,
  };
};
