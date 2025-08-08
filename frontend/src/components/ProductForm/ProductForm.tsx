import {
  Modal,
  TextInput,
  TextAreaInput,
  Button,
  NumberInput,
} from "../../shared/components";
import { useProductForm } from "./useProductForm";
import { Controller } from "react-hook-form";

//This form opens when new product added or updating existing product
const ProductForm = () => {
  const {
    setOpenProductForm,
    onSubmit,
    handleSubmit,
    control,
    errors,
    initialData,
  } = useProductForm();

  return (
    <Modal
      onClose={() =>
        setOpenProductForm({
          show: false,
          initialData: null,
        })
      }
      title={initialData ? "Update Product Details" : "Create New Product"}
      footerElement={
        <Button
          onClick={handleSubmit(onSubmit)}
          label={initialData ? "Update" : "Submit"}
        />
      }
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
          name="category"
          control={control}
          rules={{
            required: "Provide product category",
          }}
          render={({ field }) => (
            <TextInput
              name={field.name}
              onChange={field.onChange}
              label="Category"
              placeholder="Category"
              value={String(field.value)}
              error={errors.category?.message}
              required={true}
            />
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
