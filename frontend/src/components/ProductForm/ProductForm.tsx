import { Asterisk, X } from "lucide-react";
import {
  Modal,
  TextInput,
  TextAreaInput,
  Button,
  NumberInput,
} from "../../shared/components";
import { useProductForm, type FormProps } from "./useProductForm";
import type { CategoryType } from "../../types/products.types";
import { Controller, type ControllerRenderProps } from "react-hook-form";
import { cn } from "../../shared/utils/cn";

//This form opens when new product added or updating existing product
const ProductForm = () => {
  const {
    setOpenProductForm,
    onSubmit,
    handleSubmit,
    handleSelect,
    handleReset,
    isSubmitting,
    categoryList,
    control,
    errors,
    initialData,
  } = useProductForm();

  const renderCategories = (
    field: ControllerRenderProps<FormProps, "category">
  ) => {
    const fieldValues = field.value ?? [];
    return categoryList.map((category: CategoryType) => {
      const isSelected = fieldValues.includes(category._id);
      return (
        <div
          className={cn(
            "border border-gray-200 rounded-full text-sm w-fit px-2 py-0.5 flex items-center gap-2 cursor-pointer hover:bg-blue-900 hover:text-white min-w-15 justify-center",
            isSelected &&
              "bg-blue-950 text-white border-blue-950 hover:bg-blue-900"
          )}
          onClick={() =>
            field.onChange(handleSelect(fieldValues, category._id))
          }
        >
          {category.name}
          {isSelected && <X size={16} color="white" />}
        </div>
      );
    });
  };

  const renderFooter = () => {
    return (
      <div className="flex gap-2 justify-self-end">
        <Button
          label="Reset"
          className={cn(
            `bg-orange-400 hover:bg-orange-300`,
            isSubmitting && "pointer-events-none"
          )}
          onClick={handleReset}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          label={initialData ? "Update" : "Submit"}
          className={cn(isSubmitting && "pointer-events-none")}
        />
      </div>
    );
  };

  return (
    <Modal
      onClose={() =>
        setOpenProductForm({
          show: false,
          initialData: null,
        })
      }
      title={initialData ? "Update Product Details" : "Create New Product"}
      footerElement={renderFooter()}
    >
      <div className="flex flex-col gap-3">
        <Controller
          name="name"
          control={control}
          rules={{ required: "Provide product name" }}
          render={({ field }) => (
            <TextInput
              name={field.name}
              onChange={field.onChange}
              label="Name"
              placeholder="Product Name"
              value={field.value}
              error={errors.name?.message}
              required={true}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{
            required: "Provide product price",
            validate: {
              isValid: (val) =>
                Number(val) > 0 || "Price must be greater than 0",
              inRange: (val) =>
                (Number(val) >= 500 && Number(val) <= 50000) ||
                `Price range must be in INR 500 - INR 50000`,
            },
          }}
          render={({ field }) => (
            <NumberInput
              name={field.name}
              onChange={field.onChange}
              label="Price"
              placeholder="price"
              value={String(field.value)}
              error={errors.price?.message}
              required={true}
            />
          )}
        />
        <Controller
          name="imageUrl"
          control={control}
          rules={{
            required: "Provide image url",
            validate: {
              checkURL: (value) =>
                /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value) ||
                "Invalid image url",
            },
          }}
          render={({ field }) => (
            <TextInput
              name={field.name}
              onChange={field.onChange}
              label="Image URL"
              placeholder="Image URL"
              value={field.value}
              error={errors.imageUrl?.message}
              required={true}
            />
          )}
        />
        <Controller
          name="productUrl"
          control={control}
          rules={{
            required: "Provide product url",
            validate: {
              checkURL: (value) =>
                /^https?:\/\//i.test(value) || "Invalid product url",
            },
          }}
          render={({ field }) => (
            <TextInput
              name={field.name}
              onChange={field.onChange}
              label="Product URL"
              placeholder="Product URL"
              value={field.value}
              error={errors.productUrl?.message}
              required={true}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          rules={{
            required: "Provide product category",
            validate: {
              isMinimumOneSelected: (val) =>
                val.length > 0 || "Select atleast one category",
            },
          }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-sm flex items-center">
                Select Category
                <Asterisk color="red" size={10} />
              </label>
              <div className="flex flex-wrap gap-2 border p-2 py-3 rounded-md border-gray-200">
                {renderCategories(field)}
              </div>
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category?.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: "Provide product description" }}
          render={({ field }) => (
            <TextAreaInput
              name={field.name}
              onChange={field.onChange}
              label="Description"
              placeholder="Enter Product Description"
              value={field.value}
              error={errors.description?.message}
              required={true}
            />
          )}
        />
      </div>
    </Modal>
  );
};

export default ProductForm;
