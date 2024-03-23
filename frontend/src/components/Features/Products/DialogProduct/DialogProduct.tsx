import React, { RefObject } from "react";
import "./DialogProduct.scss";
import { useProduct } from "../../../../hooks/useProduct";
import { GrClose } from "react-icons/gr";
import { Product } from "../../../../types/types";
import DeleteModal from "../DeleteModal/DeleteModal";

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

  console.log("current modal", currentProduct);

  const { name, category, price, images, description, _id } =
    currentProduct || {};
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
          }}
        />
        <div className="dialog-image">
          {images && <img src={images[0]?.image} alt={name} />}
        </div>

        <div className="product-dialog-body">
          <h2>{name}</h2>
          <span>{category}</span>
          <span>£{price}</span>
          <p>{description}</p>
          <span>{_id}</span>
        </div>
        <div className="dialog-buttons-sticky">
          <button
            onClick={() => {
              handleAddProductId(_id!);
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
