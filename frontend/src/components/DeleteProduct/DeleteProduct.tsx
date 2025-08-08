import React from "react";
import { Button, Modal } from "../../shared/components";
import { useDeleteProduct } from "./useDeleteProduct";

interface DeleteProductProps {
  onClose: () => void;
  id: string;
  name: string;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ onClose, id, name }) => {
  const { handleDelete } = useDeleteProduct(id, onClose);
  const renderfooter = () => {
    return (
      <div className="flex justify-self-end gap-2">
        <Button
          label="No"
          onClick={onClose}
          className="bg-orange-400 hover:bg-orange-300"
        />
        <Button label="Yes" onClick={handleDelete} />
      </div>
    );
  };

  return (
    <Modal
      onClose={onClose}
      title="Delete Product"
      footerElement={renderfooter()}
      classes={{
        modalFooter: "border-none",
        modalBody: "p-4",
      }}
    >
      <div>Are you sure, you want to delete {name}?</div>
    </Modal>
  );
};

export default DeleteProduct;
