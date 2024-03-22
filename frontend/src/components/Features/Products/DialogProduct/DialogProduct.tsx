import React, { RefObject, SetStateAction } from "react";
import "./DialogProduct.scss";
import { useProduct } from "../../../../hooks/useProduct";
import { GrClose } from "react-icons/gr";
import { Product } from "../../../../types/types";
import DeleteModal from "../../../DeleteModal/DeleteModal";

interface props {
  dialogRef: RefObject<HTMLDialogElement>;
  currentProduct: Product;
}

const initState: Object = {
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
};

const DialogProduct = ({ dialogRef, currentProduct }: props) => {
  const { handleRemoveProductId, handleAddProductId } = useProduct();
  const handleClickOutside = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    const target = e.target as HTMLDialogElement;
    if (target.nodeName === "DIALOG") {
      target.close();
      dialogRef.current?.close();
      handleRemoveProductId();
    }
  };
  return (
    <dialog
      ref={dialogRef}
      className="product-dialog"
      onClick={handleClickOutside}
    >
      <div className="product-dialog-content">
        <GrClose
          size={12}
          className="dialog-close-icon"
          onClick={() => {
            dialogRef!.current?.close();
            setDialogOpen(false);
          }}
        />
        <div className="dialog-image">
          <img
            src={currentProduct?.images[0]?.image}
            alt={currentProduct?.name}
          />
        </div>

        <div className="product-dialog-body">
          <h2>{currentProduct?.name}</h2>
          <span>{currentProduct?.category}</span>
          <span>£{currentProduct?.price}</span>
          <p>{currentProduct?.description}</p>
          <span>{currentProduct?._id}</span>
        </div>
        <div className="dialog-buttons-sticky">
          <button
            onClick={() => {
              handleAddProductId(currentProduct?._id!);
              dialogRef!.current?.close();
            }}
            className="btn btn-primary"
          >
            Edit
          </button>
          <DeleteModal dialogRef={dialogRef} />
        </div>
      </div>
    </dialog>
  );
};

export default DialogProduct;
