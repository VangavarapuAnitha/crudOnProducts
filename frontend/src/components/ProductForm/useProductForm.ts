import { useForm } from "react-hook-form";
import { useProductContext } from "../../context/ProductsProvider";
import { useEffect } from "react";

interface FormProps {
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

export const useProductForm = () => {
  const { setOpenProductForm, openProductForm } = useProductContext();
  const initialData = openProductForm.initialData;
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      description: "",
      imageUrl: "",
    },
  });

  //Set default form values
  useEffect(() => {
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
        category: "",
        price: 0,
        description: "",
        imageUrl: "",
      });
    }
  }, [initialData]);

  const onSubmit = (data: FormProps) => {
    console.log(data);
  };

  return {
    setOpenProductForm,
    handleSubmit,
    onSubmit,
    control,
    initialData,
    errors,
  };
};
